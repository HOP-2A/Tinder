"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PlanDate() {
  const placeId = useParams().placeId as string;
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const createDate = async () => {
    const myId = user?.id;
    const response = await fetch(`/api/Dates/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userA: { myId } || "otherPerson",
        userB: { otherPersonId } || { myId },
        place: { placeId },
        message: "Looking forward to our date!",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center text-pink-700">
        Plan Your Date
      </h1>
      <div>{placeId}</div>
    </div>
  );
}
