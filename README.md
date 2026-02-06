# Linku

<div align="center">

![Linku Logo](https://linku-app.vercel.app/favicon.ico)

**One link for everything you are**

Share your content, social profiles, store, and more with a single beautiful link. Perfect for creators, businesses, and influencers.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-linku--app.vercel.app-blue)](https://linku-app.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

## ✨ Features

- **🔗 Unlimited Links** - Add as many links as you want without restrictions
- **🎨 Beautiful Design** - Clean, modern interface that showcases your content perfectly
- **📊 Advanced Analytics** - Track clicks, views, and engagement to understand your audience
- **📱 Mobile Responsive** - Looks great on all devices
- **👤 Custom Username** - Get your personalized link (e.g., `linku-app.vercel.app/username`)
- **💳 Premium Features** - One-time payment for lifetime access to advanced features
- **🔒 Secure Authentication** - Built with Supabase for secure user management
- **⚡ Lightning Fast** - Built with Next.js 16 and optimized for performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/AbdallhElzorkany/Linku.git
   cd Linku
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Tech Stack

### Frontend

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Accessible UI components built on Radix UI
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **Date-fns** - Date and time utilities
- **QrCode.react** - QR code generation

### Backend & Database

- **Supabase** - Backend as a Service (Authentication, Database, Storage)
- **Stripe** - Payment processing
- **Next.js API Routes** - Serverless API endpoints

### Development Tools

- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

## 📁 Project Structure

```
Linku/
├── src/
│   ├── app/                           # Next.js App Router pages
│   │   ├── (app)/                     # Protected app routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── premium/
│   │   │   │   ├── page.tsx
│   │   │   │   └── success/
│   │   │   │       └── page.tsx
│   │   │   ├── preview/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── share/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (auth)/                    # Authentication routes
│   │   │   ├── forgot-password/
│   │   │   │   ├── page.tsx
│   │   │   │   └── reset/
│   │   │   │       └── page.tsx
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   ├── page.tsx
│   │   │   │   └── confirmed/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── [username]/                 # Dynamic user profile pages
│   │   │   └── page.tsx
│   │   ├── api/                       # API routes
│   │   │   └── premium/
│   │   │       └── checkout/
│   │   │           └── route.ts
│   │   ├── get-started/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx                   # Home page
│   ├── components/                    # React components
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── tooltip.tsx
│   │   ├── DeleteAccountDialog.tsx
│   │   ├── Link.tsx
│   │   ├── Logout.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProfileComponent.tsx
│   │   ├── ProfileProvider.tsx
│   │   ├── ResetPasswordComponent.tsx
│   │   ├── SidebarComponent.tsx
│   │   └── getStarted.tsx
│   ├── hooks/                         # Custom React hooks
│   │   └── use-mobile.ts
│   ├── lib/                           # Utility libraries
│   │   ├── actions/                   # Server actions
│   │   │   ├── forgot-password.ts
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── reset-password.ts
│   │   ├── helpers/                   # Helper functions
│   │   │   └── get-profile.ts
│   │   ├── supabase/                  # Supabase client configurations
│   │   │   ├── client.ts
│   │   │   ├── proxy.ts
│   │   │   └── server.ts
│   │   ├── types/                     # TypeScript type definitions
│   │   │   ├── forget-password-types.ts
│   │   │   ├── link.ts
│   │   │   ├── login-types.ts
│   │   │   ├── profile.ts
│   │   │   ├── register-types.ts
│   │   │   └── reset-password-types.ts
│   │   ├── stripe.ts
│   │   └── utils.ts
│   └── proxy.ts                       # Next.js proxy configuration
├── public/                            # Static assets
│   └── pic.jpg
├── .gitignore
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL migrations to set up the database schema
3. Enable authentication providers (email, social providers)
4. Configure Row Level Security (RLS) policies

### Stripe Setup

1. Create a Stripe account
2. Set up products and prices for the premium plan
3. Configure webhooks for payment processing
4. Add your Stripe keys to environment variables

## 📊 API Endpoints

### Premium Payment

- `POST /api/premium/checkout` - Create Stripe checkout session for premium upgrade

## 🎨 UI Components

The project uses shadcn/ui - a beautiful and accessible component library built with:

- **shadcn/ui** for accessible components built on Radix UI primitives
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Class Variance Authority** for component variants

Key components include:

- `Button` - Customizable button component
- `Input` - Form input with validation
- `AlertDialog` - Modal dialogs
- `Avatar` - User avatar component
- `Sidebar` - Navigation sidebar

## 🔐 Security Features

- **Supabase Authentication** - Secure email-based authentication with JWT tokens
- **Input Validation** - Zod schema validation for all form inputs with strong password requirements
- **Password Security** - Enforced strong password policy (uppercase, lowercase, numbers, special characters, 8+ chars)
- **Server Actions** - Secure server-side form processing with Next.js server actions
- **Environment Variables** - Sensitive configuration stored securely in environment variables
- **Email Confirmation** - Email verification required for account activation

## 📈 Analytics & Monitoring

- **Click Tracking** - Monitor link engagement
- **Profile Views** - Track profile visits
- **User Analytics** - Understand user behavior

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Built with modern web technologies:

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Authentication & database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Stripe](https://stripe.com/) - Payments

---

<div align="center">

Made with ❤️ for creators, businesses, and influencers

[![Live Demo](https://img.shields.io/badge/👉%20Live%20Demo-linku--app.vercel.app-blue)](https://linku-app.vercel.app)

</div>
