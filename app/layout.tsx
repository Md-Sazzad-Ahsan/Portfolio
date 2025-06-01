import type { Metadata } from "next";
import React, { Suspense } from "react";
import { inter } from "@/public/fonts/fonts";
import AuthProvider from "@/SessionProvider";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Md. Sazzad Ahsan - Software Developer",
  description:
    "Md. Sazzad Ahsan is a Software Engineer with a B.Sc. in Computer Science and Engineering from Daffodil Institute of IT (DIIT), Dhaka. He specializes in multi-language programming, web development, mobile app development, software development, cybersecurity, UIUX and SEO content writing. Passionate about building innovative digital solutions, he stays ahead with emerging technologies to create fast, secure, and user-friendly applications. Connect with Ahsan to explore the evolving tech world and drive impactful software projects together.",
  openGraph: {
    title: "Md. Sazzad Ahsan - Software Developer",
    description:
      "Md. Sazzad Ahsan is a Software Engineer with a B.Sc. in Computer Science and Engineering from Daffodil Institute of IT (DIIT), Dhaka. He specializes in multi-language programming, web development, mobile app development, software development, cybersecurity, UIUX and SEO content writing. Passionate about building innovative digital solutions, he stays ahead with emerging technologies to create fast, secure, and user-friendly applications. Connect with Ahsan to explore the evolving tech world and drive impactful software projects together.",
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
      "Md. Sazzad Ahsan is a Software Engineer with a B.Sc. in Computer Science and Engineering from Daffodil Institute of IT (DIIT), Dhaka. He specializes in multi-language programming, web development, mobile app development, software development, cybersecurity, UIUX and SEO content writing. Passionate about building innovative digital solutions, he stays ahead with emerging technologies to create fast, secure, and user-friendly applications. Connect with Ahsan to explore the evolving tech world and drive impactful software projects together.",
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
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                  color: '#fff',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                  color: '#fff',
                },
              },
            }}
          />
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
