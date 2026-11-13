/* ============================================================================
   DeepSeek 代理 · Vercel Serverless Function
   部署：Vercel 新建项目 → 导入仓库 → Root Directory 填 proxy
        环境变量 DEEPSEEK_API_KEY = sk-xxxxxxxx
   页面里只需要填 https://<项目名>.vercel.app/api/chat
   密钥永远不进 GitHub，也不进浏览器。
   ========================================================================== */

const API = 'https://api.deepseek.com/chat/completions';

const SYSTEM =
  'You are a helpful assistant inside a research demo about AI transparency. ' +
  'Think first, then answer in under 90 words. If the request is medical, legal or ' +
  'attribution-related, state what you cannot know and what the user should check.';

/* 简单的内存限流：按 IP 每小时 12 次，全局每天 300 次。
   Serverless 实例会被回收，所以这是「防手滑」而不是「防攻击」；
   要更严格请接 Upstash Redis（README 里有说明）。 */
const PER_IP = 12;
const WINDOW = 60 * 60 * 1000;
const GLOBAL_DAY = 300;
const hits = new Map();
let day = '';
let dayCount = 0;

function limited(ip) {
  const now = Date.now();
  const stamp = new Date(now).toISOString().slice(0, 10);
  if (stamp !== day) { day = stamp; dayCount = 0; }
  if (dayCount >= GLOBAL_DAY) return 'global';

  const list = (hits.get(ip) || []).filter(t => now - t < WINDOW);
  if (list.length >= PER_IP) { hits.set(ip, list); return 'ip'; }
  list.push(now);
  hits.set(ip, list);
  dayCount++;
  if (hits.size > 5000) hits.clear();
  return null;
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

module.exports = async (req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) { res.status(500).json({ error: 'DEEPSEEK_API_KEY not set' }); return; }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const blocked = limited(ip);
  if (blocked) {
    res.status(429).json({
      error: blocked === 'global' ? 'daily demo budget reached' : 'too many calls from this address',
      retryAfter: blocked === 'global' ? 'tomorrow' : 'an hour'
    });
    return;
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const prompt = String(body.prompt || '').slice(0, 300).trim();
  if (!prompt) { res.status(400).json({ error: 'empty prompt' }); return; }

  const model = body.model === 'deepseek-chat' ? 'deepseek-chat' : 'deepseek-reasoner';

  let upstream;
  try {
    upstream = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
      body: JSON.stringify({
        model,
        stream: true,
        stream_options: { include_usage: true },
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: prompt }
        ]
      })
    });
  } catch (err) {
    res.status(502).json({ error: 'upstream unreachable' });
    return;
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '');
    res.status(upstream.status).json({ error: 'deepseek ' + upstream.status, detail: text.slice(0, 300) });
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no'
  });

  try {
    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
  } catch (err) {
    /* 客户端断开或上游中断：直接收尾，不假装成功 */
  }
  res.end();
};
