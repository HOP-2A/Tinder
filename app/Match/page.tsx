"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { FirstStep } from "./FirstStep";
import { placetype, SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

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
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [myMatches, setMyMatches] = useState<MatchItem[]>([]);
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
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatches();
  }, [user?.id]);

  useEffect(() => {
    const mnyhMatches = matches.filter(
      (item) => item.userA.id === user?.id || item.userB.id === user?.id
    );
    setMyMatches(mnyhMatches);
  }, [matches, user?.id]);

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

  if (!myMatches.length) {
    return (
      <div className="min-h-screen bg-pink-50 py-8 text-center bg-gradient-to-b from-rose-300 via-peach-400 to-mauve-200 flex items-center justify-center">
        No matches yet
      </div>
    );
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <FirstStep
            setStep={setStep}
            otherUser={otherUser}
            setOtherUser={setOtherUser}
            myMatches={myMatches}
          />
        </div>
      )}
      {step === 2 && (
        <div>
          <SecondStep
            setStep={setStep}
            otherUser={otherUser}
            myMatches={myMatches}
            setSelectedPlace={setSelectedPlace}
            selectedPlace={selectedPlace}
          />
        </div>
      )}
      {step === 3 && (
        <div>
          <ThirdStep
            setStep={setStep}
            otherUser={otherUser}
            myMatches={myMatches}
            selectedPlace={selectedPlace}
            planDate={PlanDate}
          />
        </div>
      )}
    </div>
  );
}