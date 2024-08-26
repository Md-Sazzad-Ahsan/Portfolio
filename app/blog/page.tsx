import SeparatePages from "@/components/GlobalComponents/SeparatePages";
import HorizontalRow from "@/components/GlobalComponents/HorizontalRow"
import { playfair } from "@/public/fonts/fonts";
import BlogGrid from "@/components/BlogComponent/BlogGrid";
import LatestBlogGrid from "@/components/BlogComponent/LatestBlog/LatestBlogGrid";

export default function Blog()
{
    return (

        <main className="pt-20">
        <SeparatePages dividerText="My Blogs_" dividerTextColor="text-cyan-600" subText="Story | Content | Programming | ICT | GK" className={`py-10  sm:py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 text-center sm:text-start ${playfair.className}`} />
        <HorizontalRow RowText="Top Articles" />
        <LatestBlogGrid />
        <HorizontalRow RowText="Read more" className="mt-20" />
        <BlogGrid buttonType={"loadMore"} initialCardCount={6} />

        </main>

    );
}