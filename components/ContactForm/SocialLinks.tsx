import { FaFacebookSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

interface styleProps {
  className?: string;
}

const SocialLinks: React.FC<styleProps> = ({className}) =>
{
return(
<div className={`justify-start gap-2 pt-2 text-gray-600 dark:text-gray-50 ${className}`}>
<a href="#">
  <FaSquareGithub className="text-xl" />
</a>
<a href="#">
  <FaFacebookSquare className="text-xl" />
</a>
<a href="#">
  <FaLinkedin className="text-xl" />
</a>
<a href="#">
  <FaTwitterSquare className="text-xl" />
</a>
</div> 
);};
export default SocialLinks;