import Link from "next/link";
export default function SingleButton()
{
    return (

        <>
        <section className="space-x-5 flex sm:pl-12 pt-12 text-xs text-center items-center sm:items-start sm:justify-start">
            <Link
              href="/about"
              className="ring-1 px-8 py-2 bg-cyan-600 text-gray-50 hover:bg-cyan-700 rounded-md font-semibold"
            >
              Read more
            </Link>
            <Link href="#" className="rounded-md ring-1 px-8 py-2 hover:bg-gray-50 hover:text-darkBg font-semibold">
              Download CV
            </Link>
          </section>
        </>

    );
}