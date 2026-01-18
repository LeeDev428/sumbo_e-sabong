# Share Your Laravel App with Clients (Free Alternatives to ngrok)

## Quick Setup Guide

### Option 1: LocalTunnel (Recommended - Easiest)
Free, unlimited, no account needed!

#### Installation:
```bash
npm install -g localtunnel
```

#### Usage:
1. Start your Laravel server in one terminal:
```bash
php artisan serve
```

2. In another terminal, expose it:
```bash
lt --port 8000 --subdomain sumbo-esabong
```

You'll get a URL like: `https://sumbo-esabong.loca.lt`

**Note:** First-time visitors need to click "Continue" on a warning page. Share this URL with your client!

---

### Option 2: Cloudflare Tunnel (Most Reliable)
Free, fast, and professional!

#### Installation:
```bash
# Download cloudflared
# For Windows: https://github.com/cloudflare/cloudflared/releases
# Or use: winget install cloudflare.cloudflared
```

#### Usage:
```bash
cloudflared tunnel --url http://localhost:8000
```

You'll get a URL like: `https://random-words.trycloudflare.com`

---

### Option 3: serveo.net (No Installation)
Free SSH tunneling!

#### Usage:
```bash
ssh -R 80:localhost:8000 serveo.net
```

You'll get a URL like: `https://randomname.serveo.net`

---

## Current SSL Error Fix

The "Invalid request (Unsupported SSL request)" warnings you're seeing are harmless but annoying. They occur when:

1. **Browser extensions** try to force HTTPS
2. **Cached redirects** in your browser
3. **Browser security features** attempting HTTPS upgrades

### To Fix:
1. Clear your browser cache for `localhost:8000`
2. Use incognito/private mode
3. Disable HTTPS-forcing extensions temporarily
4. Access via `http://127.0.0.1:8000` (not https://)

---

## Recommended Workflow for Client Demo

### Step 1: Build Your Assets
```bash
npm run build
```

### Step 2: Start Laravel Server
```bash
php artisan serve
```

### Step 3: Start Tunnel (Choose one method above)
For LocalTunnel:
```bash
lt --port 8000 --subdomain sumbo-esabong
```

### Step 4: Share URL with Client
Give them the tunnel URL (e.g., `https://sumbo-esabong.loca.lt`)

---

## Pro Tips

- **Build assets first** (`npm run build`) so clients don't need Vite dev server
- Use a **consistent subdomain** so the URL doesn't change
- Test the public URL in **incognito mode** before sharing
- For long demos, **Cloudflare Tunnel** is most stable
- **LocalTunnel** is quickest for quick tests

---

## Troubleshooting

### LocalTunnel shows "Tunnel Failed"
- The subdomain might be taken, try a different one
- Remove `--subdomain` flag to get a random URL

### Client sees "Invalid Host Header"
Add to your `.env`:
```
APP_URL=https://your-tunnel-url.loca.lt
```

Then restart `php artisan serve`

### Vite assets not loading
Make sure you ran `npm run build` before sharing!
