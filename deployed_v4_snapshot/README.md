# Deployed v4 snapshot (preserved 2026-10-06)

These three files are a verbatim copy of the Apps Script project as deployed in
**version 4 ("v3 - Web App Configured")**, which was also the cloud HEAD source on 2026-10-06.
They carry a `.txt` suffix so `clasp push` never uploads them.

Why: the live web app (v4: full rewriter UI calling `adjustTextContent`, `webapp` manifest
block with access `MYSELF`) and this repository's root source (Python integration:
`getBackendData`, `openColabNotebook`, `openGitHubRepo`; older index.html) diverged.
Neither side contains the other, so neither may overwrite the other until a human
decides which UI is canonical. `adjustTextContent` is already merged into `Code.js`.

Decision needed: keep the live v4 UI (merge the Python-integration functions into it),
or keep the repo UI (then redeploy). Until then: do NOT `clasp push` from this repo root,
it would replace the live v4 UI.
