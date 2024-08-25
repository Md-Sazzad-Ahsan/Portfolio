import type { Metadata, Viewport } from "next";
import { inter } from "@/public/fonts/fonts";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Md. Sazzad Ahsan - Software Developer",
  description: "Md. Sazzad Ahsan, a Computer Engineer specializing in programming, software development, web design,web development,prototyping and content writing. Discover my work and expertise in crafting efficient digital solutions.",
  openGraph: {
    title: "Md. Sazzad Ahsan - Software Developer",
    description: "Md. Sazzad Ahsan, a Computer Engineer specializing in programming, software development, web design,web development,prototyping and content writing. Discover my work and expertise in crafting efficient digital solutions.",
    type: "website",
    locale:"en_US",
    url:"https://ahsans-portfolio.vercel.app",
    siteName:"Ahsan's Portfolio Web App"
  },
  twitter: {
    title: "Md. Sazzad Ahsan - Software Developer",
    description: "Md. Sazzad Ahsan, a Computer Engineer specializing in programming, software development, web design, web development, prototyping, and content writing. Discover my work and expertise in crafting efficient digital solutions.",
    card: "summary_large_image",
    site: "Ahsan's Portfolio",
  },
  metadataBase: new URL("https://ahsans-portfolio.vercel.app")
};

export const viewport: Viewport ={
  themeColor:"#333a3f",
};


export default function RootLayout({
  children,
}:
{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
       
        <Header/>

        <main>{children}</main> 
       
        <Footer />

      </body>
    </html>
  );
}
