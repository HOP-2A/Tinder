"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../_components/Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Signup() {
  const { push } = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn === true) {
      push("/");
    }
  }, [isLoaded, isSignedIn, push]);

  return (
    <div className="h-screen bg-cover bg-center inset-0 bg-gradient-to-br from-rose-300 via-pink-50 to-white">
      <Header />
      <div className="flex flex-col w-full h-full items-center justify-center gap-7">
        <h1 className="font-extrabold text-4xl md:text-6xl text-pink-600 drop-shadow-sm">
          FIND YOUR PARTNER
        </h1>
        <h1 className="font-extrabold text-3xl md:text-6xl text-pink-600 drop-shadow-sm">
          AND START YOUR NEW JOURNEY
        </h1>
        <h1 className="font-extrabold text-2xl md:text-6xl text-pink-600 drop-shadow-sm">
          TO MEET NEW PEOPLE
        </h1>
        <div className="text-pink-600 flex gap-3 ">
          {" "}
          <SignedOut>
            <SignInButton />
            <SignUpButton>
              <button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-pink-500 hover:to-rose-500   text-white text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:scale-110">
                GET STARTED
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
