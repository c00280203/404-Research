# Live White Box · 部署说明

让演示页里那一幕「Ask it anything. Watch it think.」真正调用 DeepSeek，  
同时保证 **API key 永远不出现在 GitHub 里**。

```
观众浏览器 ──▶ 你的代理（持 key · 限流 · 不落库）──▶ DeepSeek API
                    └──▶ 只回传流式输出，不存任何内容
```



---

## 方式一 · Vercel（推荐，约 5 分钟，免域名免信用卡）

1. 注册 <https://vercel.com>，用 **GitHub 账号登录**（不用买域名，会自动分配  
   `项目名.vercel.app`）。
2. 把本仓库推上 GitHub（`proxy/` 文件夹会一起上去，里面没有任何密钥，公开也安全）。
3. Vercel 控制台 → **Add New… → Project → Import** 你的仓库：
   - **Root Directory** 填 `proxy`
   - Framework Preset 选 **Other**
4. **Settings → Environment Variables** 添加：
   - Name：`DEEPSEEK_API_KEY`
   - Value：`sk-xxxxxxxx`（你的 DeepSeek key）
   - 只勾 Production 即可
5. **Deploy**。完成后得到 `https://<项目名>.vercel.app/api/chat`
6. 打开 `index.html`，把顶部配置区改成：
   ```js
   window.LIVE_URL = window.LIVE_URL || 'https://<项目名>.vercel.app/api/chat';
   ```
7. 推回 GitHub Pages。完成。

**验证**：打开线上页面，翻到 Live White Box 那一幕，徽章应显示绿色 **LIVE**；  
提问后左栏流式出现思考轨迹（带蓝/橙高亮），结束播一声「支付成功」提示音。

---

## 方式二 · 本机 + 临时隧道（不注册任何账号）

```bash
export DEEPSEEK_API_KEY=sk-xxxxxxxx
node proxy/server.js                    # → http://localhost:8787/api/chat
cloudflared tunnel --url http://localhost:8787    # 免注册，得到一个临时公网地址
```

把 `https://<临时地址>/api/chat` 填进 `window.LIVE_URL`。  
缺点：链接每次重启都会变，演示时电脑必须开着。

---

## 已经内置的保险

| 机制   | 说明                                           |
| ---- | -------------------------------------------- |
| 限流   | 每 IP 每小时 12 次，全局每天 300 次，超出返回 429 并在页面明确提示   |
| 不落库  | 代理不写任何日志/数据库；只转发流                            |
| 输入截断 | 提问最长 300 字符                                  |
| 失败可见 | 断网/超时/限流时，页面徽章变 **REPLAY** 并注明原因，绝不假装是实时回答   |
| 调用台账 | 每次调用显示 模式 / 模型 / 延迟 / token 数 / 请求编号，按 W 可审计 |

## 关于 key 安全

- key 只放在 **Vercel 环境变量**，仓库与页面里都没有 → 爬虫和 View Source 都拿不到。
- 建议在 DeepSeek 后台**关闭自动充值**，演示前充够一顿饭钱即可——即使代理被滥用，  
  损失上限就是余额。
- 如果 key 曾在其他地方粘贴过（聊天、截图），演示前最好去平台**换一个新 key**，  
  把新 key 填进 Vercel 即可，页面无需改动。
