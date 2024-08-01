import { playfair } from "@/public/fonts/fonts";

export default function Home() {

  return (
    <main>
      <div className="pt-32 sm:pt-64 flex flex-col sm:flex-row text-center sm:text-left justify-center sm:justify-between px-5 sm:px-48 gap-8 sm:gap-0">
        <span>
          <h1 className="text-sm sm:text-3xl text-yellow-500 dark:text-white">Hello! I am a developer</h1>
        </span>
        <span>
          <h1 className={"text-yellow-500 dark:text-white text-6xl sm:text-9xl leading-10 sm:leading-custom-tight"}>
            <p className={`${playfair.className} relative z-1 sm:pr-16`}>Sazzad</p>
            <p className={`${playfair.className}  text-gray-500 dark:text-purple-600 `}>Ahsan</p>
          </h1>
        </span>
      </div>
    </main>
  );
}
