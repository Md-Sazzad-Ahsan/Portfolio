import UnderConstruction from "@/components/LoadingPage/UnderConstructionPage";
import SeparatePages from "@/components/SeparatePages";
import HorizontalRow from "@/components/HorizontalRow"
import { playfair } from "@/public/fonts/fonts";
import LastBlog from "@/components/BlogsComponent/LastBlog";
import BlogList from "@/components/BlogsComponent/BlogList";

export default function Blog()
{
    return (

        <main className="pt-20">
        <SeparatePages dividerText="My Blogs_" dividerTextColor="text-cyan-600" subText="Story | Content | Programming | ICT | GK" className={`py-10  sm:py-20 md:py-28 px-5 sm:px-16 md:px-28 lg:px-56 text-center sm:text-start ${playfair.className}`} />
        <HorizontalRow RowText="Top Articles" />
        <LastBlog />
        <HorizontalRow RowText="Read more" className="mt-20" />
        <BlogList maxBlogs={6} buttonShow={false} />
        {/* <UnderConstruction /> */}
        </main>

    );
}