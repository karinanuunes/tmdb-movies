import Image from "next/image";
import logoTmdb from "../assets/logo-tmdb.png";
import Link from "next/link";

const Header = () => {
  return (
    <Link
      href={"/"}
      className="w-full bg-[#5C16C5] py-4 flex justify-center lg:justify-start px-28"
    >
      <Image src={logoTmdb} width={185} height={24} alt="Logo da TMDB" />
    </Link>
  );
};

export default Header;
