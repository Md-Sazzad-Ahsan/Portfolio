import { Playfair_Display, Inter } from "next/font/google";

export const playfair =Playfair_Display({
    weight: ['700'],
    subsets: ['latin'],
    display: 'swap',
}
)

export const inter = Inter({subsets: ["latin"] });