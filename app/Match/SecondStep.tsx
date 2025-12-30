import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-to-b from-rose-300 via-peach-400  flex flex-col gap-10">
      <h1 className="text-center pt-10 text-4xl font-extrabold text-pink-500 drop-shadow-sm">
        Choose Your Perfect Date Place 💕
      </h1>

      <div className="flex flex-wrap justify-center gap-5 px-6 ">
        {places.map((place) => (
          <Card
            key={place.id}
            onClick={() => {
              setStep(3);
              setSelectedPlace(place);
            }}
            className="w-[260px] cursor-pointer border border-pink-100
                       rounded-2xl shadow-md transition-all duration-300
                       hover:shadow-xl hover:-translate-y-2 bg-rose-50"
          >
            <CardFooter className="p-0">
              <img
                src={place.Pictures[0]}
                alt="Place image"
                className="w-full h-[160px] object-cover rounded-t-2xl"
              />
            </CardFooter>

            <CardHeader className="space-y-2">
              <CardTitle className="text-lg font-semibold text-pink-600">
                {place.facebook}
              </CardTitle>

              <div className="flex flex-wrap gap-1">
                {place.categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="text-sm text-gray-600">
              📞 {place.phone}
            </CardContent>

            <CardAction className="flex justify-end px-4 pb-4 text-pink-500">
              <MoveRight className="hover:translate-x-1 transition" />
            </CardAction>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  );
};
