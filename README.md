# Live White Box · Deployment Guide

Makes the "Ask it anything. Watch it think." scene on the presentation page actually call DeepSeek, while guaranteeing that **the API key never appears in GitHub**.

```
Audience browser ──▶ your proxy (holds key · rate-limited · stores nothing) ──▶ DeepSeek API
                    └──▶ streams the output back only; nothing is persisted
```

---

## Option 1 · Vercel (recommended — about 5 minutes, no domain, no credit card)

1. Register at <https://vercel.com> and **sign in with your GitHub account** (no domain purchase needed; a `project-name.vercel.app` URL is assigned automatically).
2. Push this repository to GitHub (the `proxy/` folder goes up with it; it contains no secrets, so a public repo is safe).
3. In the Vercel console → **Add New… → Project → Import** your repository:
   - **Root Directory**: `proxy`
   - Framework Preset: **Other**
4. **Settings → Environment Variables**, add:
   - Name: `DEEPSEEK_API_KEY`
   - Value: `sk-xxxxxxxx` (your DeepSeek key)
   - Production checkbox only is fine
5. **Deploy**. You get `https://<project-name>.vercel.app/api/chat`.
6. Open `index.html` and change the config block at the top to:
   ```js
   window.LIVE_URL = window.LIVE_URL || 'https://<project-name>.vercel.app/api/chat';
   ```
7. Push back to GitHub Pages. Done.

**Verify**: open the live page and navigate to the Live White Box scene — the badge should show a green **LIVE**; after asking a question, the thinking trace streams in on the left (with blue/orange highlights) and a chime plays when it finishes.

---

## Option 2 · Local machine + temporary tunnel (no accounts at all)

```bash
export DEEPSEEK_API_KEY=sk-xxxxxxxx
node proxy/server.js                    # → http://localhost:8787/api/chat
cloudflared tunnel --url http://localhost:8787    # no signup; gives you a temporary public URL
```

Put `https://<temporary-address>/api/chat` into `window.LIVE_URL`.
Drawbacks: the URL changes on every restart, and the laptop must stay on during the presentation.

---

## Safeguards Already Built In

| Mechanism | Details |
|---|---|
| Rate limiting | 12 requests per IP per hour, 300 per day globally; beyond that a 429 is returned and the page shows a clear notice |
| No persistence | The proxy writes no logs/database; it only forwards the stream |
| Input truncation | Questions are capped at 300 characters |
| Visible failure | On disconnect / timeout / rate limit, the badge switches to **REPLAY** with the reason stated — it never pretends to be a live answer |
| Audit ledger | Every call shows mode / model / latency / token count / request ID, auditable by pressing W |

## Key Safety Notes

- The key lives only in **Vercel environment variables** — it is in neither the repository nor the page, so crawlers and View Source cannot get it.
- Recommend **turning off auto-recharge** in the DeepSeek dashboard and topping up just enough for a meal before the presentation — even if the proxy gets abused, the maximum loss equals the balance.
- If the key has ever been pasted elsewhere (chats, screenshots), it is best to **create a new key** on the platform before the presentation and put the new key into Vercel; the page needs no changes.

## How the verdict is produced (and why the number is real)

The model is instructed to end every answer with exactly one machine-readable line:

```
VERDICT_JSON: {"adopt":true,"confidence":63,"risks":["...","..."]}
```

- `adopt` — whether the user should act on the answer as-is
- `confidence` — the model's own calibrated confidence (0-100); the prompt requires it to depend on the question and forbids defaulting to a round or repeated value
- `risks` — one to three question-specific caveats

The page parses that line, strips it from the visible answer, and renders the verdict bar from the model's own values. **The front end never computes or invents a confidence number.** If the line is missing or cannot be parsed, the bar shows `—` and states that no verdict was returned.

When the proxy is unreachable the badge switches to **REPLAY**. The verdict and risks then come from the clearly-labelled recorded examples, and **no confidence number is shown**, because a replay has no model confidence to report.
