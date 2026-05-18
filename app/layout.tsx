import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.asuharb.com"),
  title: {
    default: "Asuhar B — Wellness & Lifestyle Coach | Transform Your Life",
    template: "%s | Asuhar B Wellness",
  },
  description:
    "Asuhar B is a certified Wellness & Lifestyle Coach helping you create lasting transformation through holistic health, mindset coaching, nutrition guidance, and personalized wellness plans. Start your journey today.",
  keywords: [
    "wellness coach",
    "lifestyle coach",
    "Asuhar B",
    "holistic health",
    "mindset coaching",
    "nutrition coaching",
    "wellness transformation",
    "health and wellness",
    "life coach",
    "wellbeing coach",
    "online wellness coach",
    "personal wellness plan",
  ],
  authors: [{ name: "Asuhar B", url: "https://www.asuharb.com" }],
  creator: "Asuhar B",
  publisher: "Asuhar B Wellness",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.asuharb.com",
    siteName: "Asuhar B Wellness",
    title: "Asuhar B — Wellness & Lifestyle Coach",
    description:
      "Transform your health and life with certified Wellness & Lifestyle Coach Asuhar B. Personalized coaching for mind, body & soul.",
    images: [
      {
        url: "/asuhar-hero.png",
        width: 1200,
        height: 630,
        alt: "Asuhar B — Wellness & Lifestyle Coach",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asuhar B — Wellness & Lifestyle Coach",
    description:
      "Transform your health and life with certified Wellness & Lifestyle Coach Asuhar B.",
    images: ["/asuhar-hero.png"],
    creator: "@asuharb",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.asuharb.com",
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#1a3a2a" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Asuhar B",
              jobTitle: "Wellness & Lifestyle Coach",
              description:
                "Certified Wellness & Lifestyle Coach helping people transform their health, mindset, and life through personalized holistic coaching.",
              url: "https://www.asuharb.com",
              sameAs: [
                "https://instagram.com/asuharb",
                "https://linkedin.com/in/asuharb",
                "https://facebook.com/asuharb",
              ],
              offers: {
                "@type": "Service",
                name: "Wellness Coaching",
                description:
                  "Personalized wellness coaching for mind, body, and lifestyle transformation.",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }

                const savedColor = localStorage.getItem('colorTheme');
                if (savedColor) {
                  document.documentElement.setAttribute('data-theme', savedColor);
                } else {
                  document.documentElement.setAttribute('data-theme', 'green');
                }
              } catch (_) {
                document.documentElement.classList.remove('dark');
                document.documentElement.setAttribute('data-theme', 'green');
              }
            `,
          }}
        />
      </head>
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        suppressHydrationWarning
      >
        <Preloader />
        <AccessibilityWidget />
        {children}
      </body>
    </html>
  );
}
