import { useState } from "react";
import { useRouter } from "next/navigation";
import { MatchUser } from "./page";
import { placetype } from "./SecondStep";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

export const ThirdStep = ({
  setStep,
  selectedPlace,
  chosenUser,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  selectedPlace?: placetype | null;
  chosenUser?: MatchUser | null;
  planDate?: () => Promise<void>;
}) => {
  const router = useRouter();
  const [day, setDay] = useState<Date | undefined>(new Date());
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id) as { user: MatchUser | null };
  const [inputValue, setInputValue] = useState<string>("");

  const PlanDate = async () => {
    if (!day || !chosenUser || !selectedPlace) return;
    const response = await fetch("/api/Dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userA: user?.id,
        userB: chosenUser!.id,
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-gray-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-900 drop-shadow-sm">
        Plan Your Date 💕
      </h2>

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-6 border border-white/30 hover:shadow-[0_15px_35px_rgba(0,0,0,0.1)] transition-all duration-300">
        <div className="flex justify-center">
          <Calendar
            selected={day}
            onSelect={setDay}
            mode="single"
            className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all bg-white"
          />
        </div>

        {day && (
          <p className="text-center text-sm text-gray-700 font-medium">
            📅 {format(day, "yyyy-MM-dd")}
          </p>
        )}

        <Input
          placeholder="Write a sweet message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-rose-300 placeholder-gray-400 shadow-sm hover:shadow-md transition-all"
        />

        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => setStep(2)}
            className="flex-1 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-sm"
          >
            Back
          </Button>

          <Button
            onClick={PlanDate}
            className="flex-1 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Plan Date
          </Button>
        </div>
      </div>
    </div>
  );
};
