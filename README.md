# Achievers Charity Group (Next.js Version)

This is a Next.js port of the Achievers Charity Group website, designed for deployment on Vercel.

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📁 Project Structure

- `src/app`: Application source code (Pages, Layout, Globals)
- `src/components`: React components (Navbar, Footer, HeroSlider, etc.)
- `src/data`: JSON data files (formerly in `data/`)
- `public/assets`: Static assets (images, css - though CSS is imported in layout)

## ⚠️ Notes on Migration

- **Admin Panel**: The PHP-based file-system Admin Panel **is not included** in this version. Vercel and similar serverless platforms have read-only file systems, meaning you cannot update JSON files directly on the server. To enable content management, you would need to migrate the data to a database (e.g., MongoDB, PostgreSQL, Supabase) or a Headless CMS (e.g., Contentful, Sanity).
- **Contact Form**: The contact form currently simulates a submission. You should integrate a service like [Resend](https://resend.com) or [SendGrid](https://sendgrid.com) to actually send emails.
- **Donation**: Copy to clipboard functionality is implemented client-side.

## 🛠 Deployment

Push this repository to GitHub and import it into Vercel. It requires zero configuration.
