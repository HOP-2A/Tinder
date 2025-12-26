import { useState } from "react";
import { useRouter } from "next/navigation";
import { MatchItem, MatchUser } from "./page";
import { placetype } from "./SecondStep";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";
import { Input } from "@/components/ui/input";

export const ThirdStep = ({
  setStep,
  otherUser,
  selectedPlace,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  otherUser?: MatchUser | null;
  myMatches: MatchItem[] | null;
  selectedPlace?: placetype | null;
  planDate?: () => Promise<void>;
}) => {
  const router = useRouter();
  const [day, setDay] = useState<Date | undefined>(new Date());
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id) as { user: MatchUser | null };
  const [inputValue, setInputValue] = useState<string>("");

  const PlanDate = async () => {
    if (!day || !otherUser || !selectedPlace) return;
    const response = await fetch("/api/Dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userA: user?.id,
        userB: otherUser.id,
        place: selectedPlace.id,
        message: inputValue,
      }),
    });
    if (response.ok) {
      alert("Date Planned!");
      router.push("/Dates");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-300 via-peach-400 to-mauve-200 py-8 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-center text-pink-700">
        Plan Your Date 💕
      </h2>
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 flex flex-col gap-6">
        <div className="flex justify-center">
          <Calendar
            selected={day}
            onSelect={setDay}
            mode="single"
            captionLayout="dropdown"
            className="rounded-xl border border-rose-200 shadow-sm bg-white"
          />
        </div>

        {day && (
          <p className="text-center text-sm text-gray-600">
            📅 {day.toISOString().split("T")[0]}
          </p>
        )}
        <Input
          placeholder="Write a sweet message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded-xl border-rose-200 focus-visible:ring-rose-300"
        />

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setStep(2)}
            className="flex-1 rounded-xl border-rose-300 text-rose-600 hover:bg-rose-50"
          >
            Back
          </Button>

          <Button
            onClick={PlanDate}
            className="flex-1 rounded-xl bg-gradient-to-r from-peach-400 to-rose-400 text-white hover:opacity-90"
          >
            Plan Date
          </Button>
        </div>
      </div>
    </div>
  );
};
