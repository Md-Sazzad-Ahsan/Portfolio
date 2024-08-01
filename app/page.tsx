import { playfair } from "@/public/fonts/fonts";
export default function Home() {


  return (
    <main>
      <div className="pt-32 sm:pt-64 flex flex-col sm:flex-row text-center sm:text-left justify-center sm:justify-between px-5 sm:px-56 gap-8 sm:gap-0">
        <span>
          <div className="text-yellow-500 dark:text-gray-50">
          <h1 className="text-sm">Designer | Developer | Software Engineer</h1>
          <p className="text-3xl">Hello sir,I am Ahsan.</p>
          </div>
        </span>
        <span>
          <h1 className={"text-yellow-500 dark:text-white text-6xl sm:text-9xl leading-10 sm:leading-custom-tight"}>
            <p className={`${playfair.className} relative z-1 sm:pr-16`}>Sazzad</p>
            <p className={`${playfair.className}  text-gray-500 dark:text-yellow-500 `}>Ahsan</p>
          </h1>
        </span>
      </div>
    </main>
  );
}
