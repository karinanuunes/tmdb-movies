import Image from "next/image";
import { useEffect, useState } from "react";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

const CastDetail = ({ id }: any) => {
  const [person, setPerson] = useState<any>([]);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`/api/people`);
      const data = await response.json();
      setPerson(data.results);
    } catch (error) {
      console.error("Error fetching people:", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const movieFilter = person.filter((actor: any) => actor.known_for.id === id);
  console.log(movieFilter);

  return (
    <div className="flex flex-col w-[1116px] pt-20 m-auto">
      <h3 className="text-2xl font-bold">Elenco original</h3>
      <div>
        {movieFilter ? (
          movieFilter.map((actor: any) => (
            <div key={actor.id} className="flex items-center gap-4">
              <Image
                src={`${IMG_URL}${actor.profile_path}`}
                alt={`Foto de ${actor.name}`}
                width={175}
                height={222}
                className="w-24 h-36 rounded-lg object-cover"
              />
              <h4>{actor.name}</h4>
            </div>
          ))
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CastDetail;
