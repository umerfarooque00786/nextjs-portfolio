# Next.js Portfolio with Authentication, Locomotive Scroll & GSAP

A modern, professional portfolio website built with Next.js 15, featuring smooth scrolling animations powered by Locomotive Scroll and GSAP, plus a complete authentication system.

## ✨ Features

- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Authentication System**: Complete login/signup with protected routes
- **Smooth Scrolling**: Locomotive Scroll integration for buttery smooth scrolling
- **Advanced Animations**: GSAP-powered animations with scroll triggers
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Professional Sections**: Hero, About, Projects, Skills, Contact, Dashboard
- **Performance Optimized**: Server-side rendering with client-side hydration
- **Type Safe**: Full TypeScript support throughout the application
- **Protected Content**: Dashboard page requires authentication

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nextjs-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication System

### Demo Account
- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

### Features
- **Login/Signup Modal**: Beautiful modal with form validation
- **Local Storage**: User data persisted in browser storage
- **Protected Routes**: Dashboard page requires authentication
- **User Management**: Welcome messages and logout functionality

### Usage
1. Click "Sign In" in the navigation
2. Use demo account or create a new account
3. Access protected dashboard at `/dashboard`
4. Logout from the navigation menu

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scrolling**: Locomotive Scroll
- **Fonts**: Inter & JetBrains Mono (Google Fonts)
- **Icons**: Custom SVG icons

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/                # Reusable UI components
│       ├── Navigation.tsx
│       ├── Footer.tsx
│       ├── Loading.tsx
│       └── SmoothScrollProvider.tsx
├── hooks/                 # Custom React hooks
│   ├── useGSAP.ts
│   └── useLocomotiveScroll.ts
├── lib/                   # Utilities and configurations
│   ├── animations.ts      # GSAP animation presets
│   ├── constants.ts       # App constants and data
│   └── utils.ts           # Utility functions
└── types/                 # TypeScript type definitions
    └── index.ts
```

## 🎨 Customization

### Personal Information
Update your personal information in `src/lib/constants.ts`:

```typescript
export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... other details
};
```

### Projects
Add your projects in the `PROJECTS` array in `src/lib/constants.ts`.

### Skills
Customize your skills in the `SKILLS` array in `src/lib/constants.ts`.

### Styling
- Global styles: `src/app/globals.css`
- Component styles: Tailwind CSS classes
- Custom animations: `src/lib/animations.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) - Smooth scrolling
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
