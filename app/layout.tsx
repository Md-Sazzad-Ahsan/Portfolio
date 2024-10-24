import type { Metadata } from "next";
import React, { Suspense } from "react";
import { inter } from "@/public/fonts/fonts";
import AuthProvider from "@/SessionProvider"
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Md. Sazzad Ahsan - Software Developer",
  description:
    "Md. Sazzad Ahsan, a Computer Engineer specializing in programming, software development, web design, web development, prototyping, and content writing. Discover my work and expertise in crafting efficient digital solutions.",
  openGraph: {
    title: "Md. Sazzad Ahsan - Software Developer",
    description:
      "Md. Sazzad Ahsan, a Computer Engineer specializing in programming, software development, web design, web development, prototyping, and content writing. Discover my work and expertise in crafting efficient digital solutions.",
    type: "website",
    locale: "en_US",
    url: "https://ahsans-portfolio.vercel.app",
    images: [
      {
        url: "https://ahsans-portfolio.vercel.app/images/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Md. Sazzad Ahsan's Portfolio Open Graph Image",
      },
    ],
    siteName: "Ahsan's Portfolio Web App",
  },
  twitter: {
    title: "Md. Sazzad Ahsan - Software Developer",
    description:
      "Md. Sazzad Ahsan, a Computer Engineer specializing in programming, software development, web design, web development, prototyping, and content writing. Discover my work and expertise in crafting efficient digital solutions.",
    card: "summary_large_image",
    site: "@Md_Sazzad_Ahsan", // Replace with your Twitter handle or remove if not applicable
  },
  metadataBase: new URL("https://ahsans-portfolio.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#333a3f" />
      </head>
      <body className={`${inter.className}`}>
      <AuthProvider>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
        <main>{children}</main>
        </Suspense>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
