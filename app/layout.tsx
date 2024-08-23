import type { Metadata, Viewport } from "next";
import { inter } from "@/public/fonts/fonts";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Md. Sazzad Ahsan",
  description: "Developer Computer-Engineer Programmer Content-Writer",
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
