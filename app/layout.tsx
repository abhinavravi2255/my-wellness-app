import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TallyPro Solutions — Tally Certified 5-Star Partner | TallyPrime Sales & Support Kerala",
  description:
    "Premier Tally Certified 5-Star Partner offering TallyPrime Silver, Gold, Server, Customization, Training, and AMC Support in Kerala. 2000+ satisfied clients, 15+ years experience.",
  keywords:
    "TallyPrime, Tally Partner Kerala, TallyPrime customization, Tally support, GST software, accounting software India, TallyPrime Silver Gold Server",
  authors: [{ name: "TallyPro Solutions" }],
  openGraph: {
    title: "TallyPro Solutions — Tally Certified 5-Star Partner",
    description: "2000+ businesses trust us for TallyPrime sales, support, and customization in Kerala.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  localStorage.setItem('theme', 'light');
                }
                const colorTheme = localStorage.getItem('color-theme');
                if (colorTheme === 'blue') {
                  document.documentElement.classList.add('theme-blue');
                  document.documentElement.classList.remove('theme-violet');
                } else if (colorTheme === 'violet') {
                  document.documentElement.classList.add('theme-violet');
                  document.documentElement.classList.remove('theme-blue');
                } else {
                  document.documentElement.classList.remove('theme-blue', 'theme-violet');
                  localStorage.setItem('color-theme', 'emerald');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }} suppressHydrationWarning>
        <SmoothScroll />
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
