import type { Metadata } from "next";
import { inter } from "@/public/fonts/fonts";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: "Md. Sazzad Ahsan",
  description: "Developer Computer-Engineer Programmer Content-Writer",
};


{/*Layout Components Rendering starts from here*/}
export default function RootLayout({
  children,
  //  this children props will be replaced by the page.tsx file as props from app folder
}:
{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
       
        {/*add the Header component here so that it stays at every page */}
        <Header/>

        <main>{children}</main> 
        {/*This children will be replaced by the page.tsx file from the app folder as 'Home'*/}

       
        {/*add the Footer component here so that it stays at every page */}
        <Footer />

      </body>
    </html>
  );
}
