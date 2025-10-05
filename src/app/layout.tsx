import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Umer Farooque | Full Stack Developer",
  description: "Professional portfolio showcasing modern web development projects with React, Next.js, and cutting-edge technologies.",
  keywords: ["portfolio", "web developer", "full stack", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Umer Farooque" }],
  creator: "Umer Farooque",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://umer-portfolio.vercel.app",
    title: "Umer Farooque | Full Stack Developer",
    description: "Professional portfolio showcasing modern web development projects",
    siteName: "Umer Farooque Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Umer Farooque | Full Stack Developer",
    description: "Professional portfolio showcasing modern web development projects",
    creator: "@umerkhan786",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
