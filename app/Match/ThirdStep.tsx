import { useState } from "react";
import { MatchItem, MatchUser } from "./page";
import { placetype } from "./SecondStep";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";

export const ThirdStep = ({
  setStep,
  otherUser,
  selectedPlace,
  planDate,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  otherUser?: MatchUser | null;
  myMatches: MatchItem[] | null;
  selectedPlace?: placetype | null;
  planDate?: () => Promise<void>;
}) => {
  const [day, setDay] = useState<Date | undefined>(new Date());
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id) as { user: MatchUser | null };
  console.log(user, "myId");
  console.log(otherUser, "otherUser");
  console.log(selectedPlace, "selectedPlace");
  //   console.log(message, "message");

  const PlanDate = async () => {
    if (!day || !otherUser || !selectedPlace) return;
    const response = await fetch("/api/Dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userA: user?.id,
        userB: otherUser.id,
        place: selectedPlace.id,
        message: "Looking forward to our date!",
      }),
    });
    if (response.ok) {
      alert("Date Planned!");
    }
  };

  return (
    <div>
      dada
      <Calendar
        selected={day}
        onSelect={setDay}
        mode="single"
        className="rounded-md border shadow-sm"
        captionLayout="dropdown"
      />
      {day && <p>Picked date: {day ? day.toISOString().split("T")[0] : ""}</p>}
      <Button onClick={() => setStep(2)}>Back</Button>
      <Button onClick={() => PlanDate()}>Plan Date</Button>
    </div>
  );
};
