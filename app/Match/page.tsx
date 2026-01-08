"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FirstStep } from "./FirstStep";
import { placetype, SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { Footer } from "../_components/Footer";

export type MatchUser = {
  id: string;
  username: string;
  profilePic?: string | null;
  firstName?: string;
  lastName?: string;
};

export type MatchItem = {
  id: string;
  userA: MatchUser;
  userB: MatchUser;
  userAId: string;
  userBId: string;
};

export default function Match() {
  const [otherUser, setOtherUser] = useState<MatchUser | null>(null);
  const [chosenUser, setChosenUser] = useState<MatchUser | null>(null);
  const [matches, setMatches] = useState<MatchItem[] | null>(null);
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id) as { user: MatchUser | null };
  const [selectedPlace, setSelectedPlace] = useState<placetype | null>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!user?.id) return;

    const fetchMatches = async () => {
      try {
        const res = await fetch("/api/Matches");
        const data: MatchItem[] = await res.json();
        const filteredData = data.filter(
          (item) => item.userA.id === user.id || item.userB.id === user.id
        );
        setMatches(filteredData);
      } catch (err) {
        console.error(err);
        setMatches([]);
      }
    };

    fetchMatches();
  }, [user?.id]);

  const PlanDate = async () => {
    if (!otherUser || !selectedPlace) return;
    const response = await fetch("/api/Dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userA: user,
        userB: otherUser,
        place: selectedPlace,
        message: "Looking forward to our date!",
      }),
    });
    if (response.ok) {
      alert("Date Planned!");
    }
  };

  return (
    <div className="min-h-screen relative py-8 flex flex-col overflow-hidden">
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-rose-200 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>

      {matches === null ? (
        <div className="flex-1 flex justify-center items-center relative z-10">
          <div className="w-16 h-16 border-4 border-white/30 border-t-pink-400 rounded-full animate-spin"></div>
        </div>
      ) : matches.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center relative z-10">
          <Footer />
        </div>
      ) : (
        <div className="flex-1 relative z-10">
          {step === 1 && (
            <FirstStep
              setStep={setStep}
              setOtherUser={setOtherUser}
              matches={matches}
              setChosenUser={setChosenUser}
            />
          )}
          {step === 2 && (
            <SecondStep setStep={setStep} setSelectedPlace={setSelectedPlace} />
          )}
          {step === 3 && (
            <ThirdStep
              setStep={setStep}
              chosenUser={chosenUser}
              selectedPlace={selectedPlace}
              planDate={PlanDate}
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
