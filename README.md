<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/828b61eb-4325-4502-9351-9c0f22b57385

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## GitHub Pages

Site: https://alexeevleonid4231.github.io/-/

After push, GitHub Actions builds the app and publishes to the `gh-pages` branch.

**Settings → Pages → Build and deployment → Deploy from a branch** (choose one):

| Branch | Folder |
|--------|--------|
| `gh-pages` | `/ (root)` |
| `main` | `/docs` |

**Important:** do **not** use `main` + `/ (root)` — that publishes raw source and shows a blank page.
