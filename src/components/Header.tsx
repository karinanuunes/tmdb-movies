import Image from "next/image";
import logoTmdb from "../assets/logo-tmdb.png";

const Header = () => {
  return (
    <div className="w-full bg-[#5C16C5] py-4 flex justify-center lg:justify-start px-28">
      <Image src={logoTmdb} width={185} height={24} alt="Logo da TMDB" />
    </div>
  );
};

export default Header;
