/* ============================================================
   LOCAL ONLY · 你自己的 key 放这里，不要提交到 GitHub
   ------------------------------------------------------------
   index.html 不会存 key（那样源码里就能被 View Source 看到）。
   页面用 <script src="config.local.js"> 把这一行读进去：
   key 只存在这台电脑的这个文件里。

   部署到 Vercel / GitHub Pages 时不要带上这个文件；
   那时改用 proxy（把 key 放进 Vercel 环境变量 DEEPSEEK_API_KEY）。
   ============================================================ */
// 本地直连 key 已移除：改用 B 方案（Vercel 代理），key 只存服务端 DEEPSEEK_API_KEY。
// 本机若需直连调试，临时把你的 key 填到这里；切勿提交/上传。
window.DS_KEY = 'sk-51c645f2f4824f04b13bdb146f657cdd';
