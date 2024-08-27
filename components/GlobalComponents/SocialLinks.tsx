import { FaFacebookSquare, FaInstagramSquare, FaLinkedin, FaTwitterSquare } from "react-icons/fa";
import { FaSquareGithub,FaSquareXTwitter } from "react-icons/fa6";

interface styleProps {
  className?: string;
}

const SocialLinks: React.FC<styleProps> = ({className}) =>
{
return(
<div className={`justify-start gap-3 pt-2 text-gray-50 ${className}`}>
<a href="https://github.com/Md-Sazzad-Ahsan/">
  <FaSquareGithub className="text-3xl sm:text-2xl" />
</a>
<a href="https://linkedin.com/in/md-sazzad-ahsan/">
  <FaLinkedin className="text-3xl sm:text-2xl" />
</a>
<a href="https://facebook.com/Ahsan.Himu.Star/">
  <FaFacebookSquare className="text-3xl sm:text-2xl" />
</a>
<a href="https://instagram.com/Ahsan.Himu_Star/">
  <FaInstagramSquare className="text-3xl sm:text-2xl" />
</a>
<a href="https://x.com/Md_Sazzad_Ahsan/">
  <FaSquareXTwitter className="text-3xl sm:text-2xl" />
</a>
</div> 
);};
export default SocialLinks;