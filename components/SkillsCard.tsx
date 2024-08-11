import { FaFigma ,FaCode} from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineAndroid } from "react-icons/ai";

function SkillsCard() {
  return (
    <main>
        <section>
  <ul className="bg-gray-50 dark:bg-darkBg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 sm:gap-2 md:gap-3 pt-20 md:pt-24 pb-10">
    <li className="text-3xl text-yellow-500 dark:text-gray-50 font-bold text-left sm:text-center p-5 sm:p-0 col-span-full uppercase py-5 md:pt-10 md:pb-5">Skills I have</li>
    <li className="h-80 flex flex-col p-5 sm:p-6 md:p-8 ring-white shadow-lg hover:shawod-xl rounded-md">
      <div className="font-bold text-4xl px-4 pt-8 pb-5 pl-8 sm:pl-4 md:py-4">
      <BsPencilSquare className="text-darkBg dark:text-gray-50 h-7 w-7" />
      </div>
      <div className="text-2xl text-yellow-500 dark:text-cyan-700 font-bold pb-2 md:pb-3 pl-14 sm:pl-4">Content Writing</div>
      <div className="text-sm sm:text-md sm:text-lg text-gray-700 dark:text-gray-50 pl-14 sm:pl-4">Keyword Research <br/>SEO Friendly Content <br/>
        Storytelling and Narrative 
      </div>
    </li>
    <li className=" h-80 flex flex-col p-4 sm:p-5 md:p-6 ring-gray-800 shadow-lg hover:shawod-xl rounded-md">
      <div className="font-bold text-4xl px-4 pt-8 pb-5 pl-8 sm:pl-4 md:py-5">
        <FaFigma className="h-7 w-7 text-darkBg dark:text-gray-50" />
      </div>
      <div className="text-2xl text-yellow-500 dark:text-cyan-700 font-bold pb-2 md:pb-3 pl-14 sm:pl-4">UI/UX Designing</div>
      <div className="text-sm sm:text-md sm:text-lg text-gray-700 dark:text-gray-50 pl-14 sm:pl-4">
        Canva, Figma <br/> Wireframe & Prototype Design <br/> 
        Responsive Layout Design
       </div>
    </li>
    <li className="h-80 flex flex-col p-4 sm:p-5 md:p-6 ring-gray-800 shadow-lg hover:shawod-xl rounded-md">
      <div className="font-bold text-4xl px-4 pt-8 pb-5 pl-8 sm:pl-4 md:py-5">
        <FaCode className="h-7 w-7 text-darkBg dark:text-gray-50" />
      </div>
      <div className="text-2xl text-yellow-500 dark:text-cyan-700 font-bold pb-2 md:pb-3 pl-14 sm:pl-4">Web Development.</div>
      <div className="text-sm sm:text-md sm:text-lg text-gray-700 dark:text-gray-50 pl-14 sm:pl-4"> HTML CSS & Tailwind CSS <br/>
        JavaScript & DOM Interaction </div>
    </li>
    <li className="h-80 flex flex-col p-4 sm:p-5 md:p-6 ring-gray-800 shadow-lg hover:shawod-xl rounded-md">
      <div className="font-bold text-4xl px-4 pt-8 pb-5 pl-8 sm:pl-4 md:py-5">
        <AiOutlineAndroid className="h-7 w-7 text-darkBg dark:text-gray-50" />
      </div>
      <div className="text-2xl text-yellow-500 dark:text-cyan-700 font-bold pb-4 md:pb-5 pl-14 sm:pl-4">App Development</div>
      <div className="text-sm sm:text-md sm:text-lg text-gray-700 dark:text-gray-50 pl-14 sm:pl-4">React Native and <br/>MySQL Database <br/>Others
      </div>
    </li>
    <li className="col-span-full text-center pt-5 sm:pt-8 md:pt-10"><a href="#" className="bg-cyan-700 px-8 py-1 text-base sm:text-md md:text-lg text-darkBg dark:text-gray-50 font-semibold rounded-md shadow-md hover:shadow-lg hover:bg-cyan-900">View all</a></li>
  </ul>
</section>

    </main>
  )
}

export default SkillsCard;