"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "../_components/Footer";
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
  const [places, setPlaces] = useState<placetype[]>([]);
  const params = useParams();
  useEffect(() => {
    const getplaces = async () => {
      const response = await fetch("/api/Places");
      const data = await response.json();
      setPlaces(data.message);
    };
    getplaces();
  }, []);
  console.log(places);
  return <div>hello</div>;
}
