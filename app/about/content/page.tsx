import React from 'react'
import { playfair } from "@/public/fonts/fonts";
import SeparatePages from '@/components/GlobalComponents/SeparatePages'

export default function Content() {
  return (
    <div>
         <SeparatePages dividerText="Content_" subText="Webapp | Software | Story | Promotion | SEO" dividerTextColor="text-cyan-600" className={`py-10 sm:py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 text-center sm:text-left ${playfair.className}`} />
    </div>
  )
}
