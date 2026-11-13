/* ============================================================================
   本地代理（零依赖）· 用于不想部署 Vercel 的场合
   ---------------------------------------------------------------
   1) export DEEPSEEK_API_KEY=sk-xxxxxxxx
   2) node server.js                     → http://localhost:8787/api/chat
   3) 让公网能访问（任选其一）：
      · cloudflared tunnel --url http://localhost:8787     （免注册，链接每次变）
      · ngrok http 8787
      · 同一 WiFi 内直接用 http://<你的内网IP>:8787/api/chat
   然后把 index.html 的 LIVE_URL 指向 .../api/chat
   ========================================================================== */

const http = require('http');
const { URL } = require('url');

const PORT = process.env.PORT || 8787;
const KEY = process.env.DEEPSEEK_API_KEY || '';
const API = 'https://api.deepseek.com/chat/completions';
const SYSTEM =
  'You are a helpful assistant inside a research demo about AI transparency. ' +
  'Think first, then answer in under 90 words. If the request is medical, legal or ' +
  'attribution-related, state what you cannot know and what the user should check.';

const PER_IP = 12, WINDOW = 3600e3, GLOBAL_DAY = 300;
const hits = new Map();
let day = '', dayCount = 0;

function limited(ip) {
  const now = Date.now();
  const stamp = new Date(now).toISOString().slice(0, 10);
  if (stamp !== day) { day = stamp; dayCount = 0; }
  if (dayCount >= GLOBAL_DAY) return 'global';
  const list = (hits.get(ip) || []).filter(t => now - t < WINDOW);
  if (list.length >= PER_IP) { hits.set(ip, list); return 'ip'; }
  list.push(now); hits.set(ip, list); dayCount++;
  return null;
}

function send(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Content-Length': Buffer.byteLength(body)
  });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    });
    return res.end();
  }
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname !== '/api/chat') return send(res, 404, { error: 'not found' });
  if (req.method !== 'POST') return send(res, 405, { error: 'POST only' });
  if (!KEY) return send(res, 500, { error: 'DEEPSEEK_API_KEY not set' });

  const ip = (req.socket.remoteAddress || 'local').replace('::ffff:', '');
  const blocked = limited(ip);
  if (blocked) return send(res, 429, { error: blocked === 'global' ? 'daily demo budget reached' : 'too many calls from this address' });

  let raw = '';
  req.on('data', c => { raw += c; if (raw.length > 4096) req.destroy(); });
  req.on('end', async () => {
    let body = {};
    try { body = JSON.parse(raw || '{}'); } catch (e) { return send(res, 400, { error: 'bad json' }); }
    const prompt = String(body.prompt || '').slice(0, 300).trim();
    if (!prompt) return send(res, 400, { error: 'empty prompt' });
    const model = body.model === 'deepseek-chat' ? 'deepseek-chat' : 'deepseek-reasoner';

    let upstream;
    try {
      upstream = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + KEY },
        body: JSON.stringify({
          model, stream: true, stream_options: { include_usage: true }, temperature: 0.7,
          messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }]
        })
      });
    } catch (e) {
      return send(res, 502, { error: 'upstream unreachable' });
    }
    if (!upstream.ok) {
      const t = await upstream.text().catch(() => '');
      return send(res, upstream.status, { error: 'deepseek ' + upstream.status, detail: t.slice(0, 300) });
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Access-Control-Allow-Origin': '*',
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
    } catch (e) { /* client gone */ }
    res.end();
  });
});

server.listen(PORT, () => {
  console.log('proxy →  http://localhost:' + PORT + '/api/chat');
  if (!KEY) console.log('⚠  没有检测到 DEEPSEEK_API_KEY，请先 export');
});
