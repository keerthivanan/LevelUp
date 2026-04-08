# Dizilo AI — n8n LinkedIn Automation

## Project in one line
Daily LinkedIn posts: GPT-4o writes → gpt-image-1 designs → Cloudinary hosts → LinkedIn posts. Runs every day 8AM UTC via n8n.

## What's where
- `scripts/deploy.mjs` — THE source of truth. Edit here, run `node scripts/deploy.mjs`, done.
- `agenix/.env.local` — all secrets (n8n API key, OpenAI, Cloudinary, etc.)
- n8n host: `n8n.srv1520651.hstgr.cloud` | Workflow ID: `nSTbmFIcCJ6lDI0q`
- LinkedIn credential ID in n8n: `AuMCwiW94S1Q7TAw`

## n8n pipeline (8 nodes in order)
1. Schedule / Manual Trigger → 2. Content Engine (Code: GPT-4o-mini via httpRequest) → 3. Extract Content (Code) → 4. Generate Branded Image (HTTP: gpt-image-1) → 5. Prepare Upload (Code: Cloudinary sig) → 6. Upload to Cloudinary (HTTP) → 7. Prepare LinkedIn Post (Code) → 8. Post via Buffer (Code: Buffer GraphQL API) → 9. Log to Sheet (Google Sheets)

## Hard rules — read before touching anything
1. **n8n 2.12 has NO native OpenAI node** — always use Code node + `this.helpers.httpRequest` for OpenAI calls.
2. **`require()` is blocked** in n8n Code nodes — use `crypto.subtle` (Web Crypto) for hashing, nothing else.
3. **n8n public API cannot "run now"** a schedule workflow — only triggers are: (a) webhook URL or (b) MCP with `availableInMCP: true` set in UI.
4. **Webhook registration via API is unreliable** — if webhook 404s, go to n8n UI → workflow → activate toggle OFF then ON.
5. **Never embed long system prompts in n8n expressions** (`={{ }}`) — they break the expression parser. Put them in Code nodes as JS strings.
6. **Always deploy by running** `node scripts/deploy.mjs` from the `agenix/` folder — do not hand-edit workflows in the n8n UI.

## Token-saving rules for Claude
- Read `deploy.mjs` once, make all changes, deploy once. No iteration loops.
- If a webhook 404s: check n8n UI and toggle activation. Don't retry 5 times.
- If an API returns 405: that endpoint doesn't exist. Stop trying it.
- Never try more than 2 approaches for the same problem. Pick the best one and commit.
- Do not re-read files you already read in the same session.
