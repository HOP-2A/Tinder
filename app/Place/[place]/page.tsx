"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "../../_components/Footer";
import { Button } from "@/components/ui/button";

type placetype = {
  id: string;
  Pictures: string[];
  categories: string[];
  facebook: string;
  instagram: string;
  location: string;
  phone: string;
};

export default function Home() {
  const router = useRouter();
  const [places, setPlaces] = useState<placetype>();
  const params = useParams();
  const place = params.place as string;

  useEffect(() => {
    const getplace = async () => {
      const response = await fetch(`/api/Places/${place}`);
      const data = await response.json();
      setPlaces(data.message);
    };
    getplace();
  }, [place]);

  const pushToPlanDate = () => {
    router.push(`/PlanDate/${place}`);
  }

  return (
    <div className="min-h-screen bg-pink-50 px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-8">
        {places?.facebook} 💕
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-pink-500">📞 Phone:</span>
          <span className="text-gray-700">{places?.phone}</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-semibold text-pink-500">🏷 Categories:</span>
          {places?.categories.map((cat, index) => (
            <span
              key={index}
              className="text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-pink-500">📍 Location:</span>
          <span
            onClick={() => router.push(places!.location)}
            className="text-pink-600 underline cursor-pointer hover:text-pink-700"
          >
            Open Google Maps
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {places?.Pictures.map((zurg, indx) => (
          <div
            key={indx}
            className="overflow-hidden rounded-2xl shadow-md bg-white
                       hover:shadow-xl transition-all duration-300"
          >
            <img
              src={zurg}
              alt="Place image"
              className="w-full h-[220px] object-cover hover:scale-105 transition duration-300"
            />
          </div>
        ))}
        <Button onClick={()=>pushToPlanDate()}>Plan Date</Button>
      </div>

      <Footer />
    </div>
  );
}
