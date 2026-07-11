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
