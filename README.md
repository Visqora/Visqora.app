# Visqora Technologies

Official website of Visqora Technologies - Vision at the Core.

The site presents Visqora's services, selected work, company information, and contact experience in a responsive Next.js application.

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- pnpm

## Requirements

- Node.js 20.9 or newer
- pnpm 11.7.0

Corepack can activate the package manager version declared in `package.json`:

```bash
corepack enable
corepack prepare pnpm@11.7.0 --activate
```

## Local development

Install dependencies and start the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

To expose the server only on the local interface and use an explicit port:

```bash
pnpm dev --hostname 127.0.0.1 --port 3000
```

## Production build

```bash
pnpm build
pnpm start
```

## Available routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/services` | Services overview |
| `/services/[slug]` | Individual service pages |
| `/work` | Selected work |
| `/work/[slug]` | Individual project pages |
| `/about` | Company information |
| `/careers` | Careers page |
| `/contact` | Contact page |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

Unknown service and project slugs use the custom not-found page.

## Project structure

```text
app/                 Pages, layouts, metadata, and global styles
components/          Shared site and UI components
lib/                 Shared utilities
public/              Logos, favicons, and site imagery
next.config.mjs      Next.js configuration
postcss.config.mjs   Tailwind/PostCSS configuration
```

## Branding assets

- `public/visqora-logo.png` - cropped wordmark used in the header and footer
- `public/visqora.png` - original supplied logo
- `public/visqora-hero.png` - home page hero artwork
- `public/icon-*-32x32.png` - browser icons
- `public/apple-icon.png` - Apple touch icon

## Before production

- Run `pnpm typecheck`, `pnpm build`, and `pnpm audit --prod`.
- Connect both `visqora.app` and `www.visqora.app`; the application redirects the root domain to `www`.
- Confirm SSL, uptime monitoring, billing alerts, and error notifications in the hosting dashboard.
- Submit `https://www.visqora.app/sitemap.xml` to Google Search Console after deployment.
- Verify `visqora@gmail.com`, company links, and legal copy before publishing material business changes.
