import Button from "@/components/Button";
import Posters from "@/components/Posters";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-[#2D0C5E] py-28 gap-10">
        <h1 className="max-w-[780px] text-5xl text-center font-bold text-white">
          Milhões de filmes, séries e pessoas para descobrir. Explore já.
        </h1>
        <div className="max-w-[1080px] flex flex-col gap-2 px-4">
          <span className="text-white text-center">FILTRE POR:</span>
          <Button />
        </div>
      </div>
      <Posters />
    </>
  );
}
