
# OTP Project

Simple Node.js project with a small frontend. This repository contains a server-side entry point and an optional frontend UI.

## Contents
- `index.js` — main Node.js entry (server or script).
- `mail.js` — helper for sending mail / mail-related logic.
- `package.json` — project metadata and scripts.
- `frontend/index.html` — minimal frontend UI.

## Requirements
- Node.js (v14+ recommended)

## Installation

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
node index.js
# or, if configured, `npm start`
```

If `index.js` starts an HTTP server, open the served URL in your browser or open `frontend/index.html` directly for a static UI.

## Configuration

- If the project sends email or requires credentials, set environment variables (e.g. SMTP host, user, pass) before running.
- Example (PowerShell):

```powershell
$env:SMTP_HOST = 'smtp.example.com'
$env:SMTP_USER = 'user@example.com'
$env:SMTP_PASS = 'yourpassword'
node index.js
```

## Development

- Edit server code in `index.js` and helpers in `mail.js`.
- Serve or open `frontend/index.html` to view the UI.

## Contributing

Issues and PRs are welcome. Describe changes clearly and include testing notes.

## License

This project has no license specified. Add a `LICENSE` file (for example, MIT) if you wish to set licensing.

## ✅ Recommendation

For testing purposes, the data has not been encrypted.
However, in a production environment, it is strongly recommended to send encrypted data either in cookies or as part of the response payload to ensure better security.

