"use client";
import { useUser } from "@clerk/nextjs";
import { Footer } from "./_components/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "./_components/Header";

export default function Home() {
  const { push } = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return; // wait until clerk loads

    if (isSignedIn === false) {
      push("/heloo");
    }
  }, [isLoaded, isSignedIn, push]);

  return (
    <div className="h-screen bg-cover bg-center bg-black">
      <div>
        <Header />
        <Footer />
      </div>
    </div>
  );
}
