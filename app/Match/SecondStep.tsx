import { MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Footer } from "../_components/Footer";

export type placetype = {
  id: string;
  Pictures: string[];
  categories: string[];
  facebook: string;
  instagram: string;
  location: string;
  phone: string;
};

export const SecondStep = ({
  setStep,
  setSelectedPlace,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setSelectedPlace: React.Dispatch<React.SetStateAction<placetype | null>>;
}) => {
  const [places, setPlaces] = useState<placetype[]>([]);

  useEffect(() => {
    const getplaces = async () => {
      const response = await fetch("/api/Places");
      const data = await response.json();
      setPlaces(data.message);
    };
    getplaces();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-12 flex flex-col items-center">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-sm mb-10">
        Choose Your Perfect Date Spot 💖
      </h1>

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {places.map((place) => (
          <div
            key={place.id}
            className="w-[260px] cursor-pointer rounded-3xl bg-white border border-gray-200 shadow-lg 
                     hover:shadow-[0_20px_40px_rgba(255,182,193,0.3)] transition-all duration-300 transform hover:-translate-y-3"
            onClick={() => {
              setStep(3);
              setSelectedPlace(place);
            }}
          >
            <div className="relative">
              <img
                src={place.Pictures[0]}
                alt="Place image"
                className="w-full h-[160px] object-cover rounded-t-3xl"
              />
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-black/25 to-transparent rounded-t-3xl"></div>
            </div>

            <div className="px-4 pt-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-900">
                {place.facebook}
              </h2>

              <div className="flex flex-wrap gap-2">
                {place.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 rounded-full bg-pink-50 text-pink-600 font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 px-4 py-2">📞 {place.phone}</p>

            <div className="flex justify-end px-4 pb-4 text-pink-500">
              <MoveRight className="hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
