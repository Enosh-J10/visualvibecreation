# Deployment and Domain Setup Guide

This guide details how to deploy the **Visual Vibe Creation** studio website to **Vercel** and connect the custom domain `visualvibecreation.com` through **Cloudflare**.

---

## 1. Deploying to Vercel

Vercel provides native support for Next.js apps with zero-configuration building.

### Step 1: Push Code to GitHub
1. Create a repository on GitHub named `Visual-Vibe-Website` (or similar).
2. Initialize git and push this local folder:
   ```bash
   git init
   git add .
   git commit -m "Initialize visual vibe creation website"
   git branch -M main
   git remote add origin https://github.com/Enosh-J10/Visual-Vibe-Website.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Log in to the [Vercel Dashboard](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import the `Visual-Vibe-Website` repository.
4. Keep the default settings (Framework Preset: **Next.js**).
5. Click **Deploy**.
6. Once deployed, Vercel will assign a default subdomain (e.g. `visual-vibe-website.vercel.app`).

---

## 2. Connecting Domain via Cloudflare

To hook up `visualvibecreation.com` with Cloudflare performance caching and Vercel routing:

### Step 1: Add Custom Domain to Vercel
1. In Vercel, navigate to your project dashboard.
2. Go to **Settings** > **Domains**.
3. Enter `visualvibecreation.com` and click **Add**.
4. Vercel will recommend adding:
   - Name: `@` | Type: `A` or `CNAME` | Value: `cname.vercel-dns.com`
   - Name: `www` | Type: `CNAME` | Value: `cname.vercel-dns.com`

### Step 2: Configure Cloudflare DNS
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com).
2. Select your domain `visualvibecreation.com`.
3. Go to the **DNS** settings page.
4. Add the following records:
   
   | Type  | Name  | Target                 | Proxy status     | TTL      |
   | :---  | :---  | :-----                 | :-----------     | :---     |
   | CNAME | `@`   | `cname.vercel-dns.com` | Proxied (Orange) | Auto     |
   | CNAME | `www` | `cname.vercel-dns.com` | Proxied (Orange) | Auto     |

### Step 3: Configure SSL/TLS Encryption
1. In Cloudflare, navigate to the **SSL/TLS** menu.
2. Set the encryption mode to **Full (strict)**.
   > [!IMPORTANT]
   > Do **NOT** set SSL to *Flexible*. Doing so creates redirect loops between Cloudflare's edge proxy and Vercel's automated Let's Encrypt certificates.

### Step 4: Add Custom Page Rules (Optional but Recommended)
To redirect all non-www traffic to www (or vice versa):
1. In Cloudflare, go to **Rules** > **Page Rules**.
2. Create a new rule:
   - URL Match: `http://visualvibecreation.com/*`
   - Setting: **Forwarding URL** -> **301 Permanent Redirect**
   - Target URL: `https://www.visualvibecreation.com/$1`

---

## 3. Contact Form Environment Setup

The contact form is secured with Cloudflare Turnstile bot protection and dispatched via Resend.

### Required Environment Variables

Configure the following environment variables on Vercel and locally in `.env.local`:

| Variable Name | Description / Values | Scope |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | API key from your Resend account. | Server-only |
| `CONTACT_FROM_EMAIL` | Sending address on your verified domain (e.g. `website@visualvibecreation.com`). | Server-only |
| `CONTACT_TO_EMAIL` | Inbox destination address (defaults to `hello@visualvibecreation.com`). | Server-only |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile public widget Site Key. | Client & Server |
| `TURNSTILE_SECRET_KEY` | Turnstile Secret Key. | Server-only |
| `CONTACT_ALLOWED_HOSTNAMES` | Optional comma-separated allowlist of hostname values returned from verification (e.g., `visualvibecreation.com,www.visualvibecreation.com,localhost`). | Server-only |

> [!WARNING]
> Keep server-only variables (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`, and `CONTACT_ALLOWED_HOSTNAMES`) private. Do not prefix them with `NEXT_PUBLIC_`.

### Setup Instructions

#### Cloudflare Turnstile
1. Go to the Cloudflare Turnstile dashboard.
2. Add a site named `Portfolio Contact Form`.
3. Choose **Managed** mode.
4. Input your domain hostnames (`visualvibecreation.com`, Vercel deployment preview hostnames, and `localhost` for local dev).
5. Copy the generated **Site Key** and **Secret Key**.
6. For local testing, you can use Cloudflare's official testing keys:
   - Site Key: `1x00000000000000000000AA`
   - Secret Key: `1x000000000000000000000000000000AA`

#### Resend Email
1. Sign up for a free account at [Resend](https://resend.com).
2. Go to **Domains** and add `visualvibecreation.com`.
3. Add the provided MX and TXT DNS records to your Cloudflare DNS console.
4. Once verified, generate an API key and set `CONTACT_FROM_EMAIL` to a verified address (e.g., `website@visualvibecreation.com`).

