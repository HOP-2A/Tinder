"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../_components/Header";
import { useUser } from "@clerk/nextjs";

export default function Signup() {
  const { push } = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return; // wait until clerk loads

    if (isSignedIn === true) {
      push("/");
    }
  }, [isLoaded, isSignedIn, push]);

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://zobximidjhkdm9nx.public.blob.vercel-storage.com/Screenshot%202025-12-06%20at%2010.35.25-uRrdUQB2IDguGlLJuMEkSXk5OwJJZh.png')",
      }}
    >
      <Header />
      <div className="flex flex-col w-full h-full items-center justify-center gap-7">
        <h1 className="font-semibold text-5xl text-white">FIND YOUR PARTNER</h1>
        <h1 className="font-semibold text-4xl text-white">
          AND START YOUR NEW JOURNEY
        </h1>
        <h1 className="font-semibold text-3xl text-white">
          TO MEET NEW PEOPLE
        </h1>
      </div>
    </div>
  );
}
