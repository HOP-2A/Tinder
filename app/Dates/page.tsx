"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "../_components/Footer";

type DateUser = {
  id: string;
  username: string;
  profilePic?: string | null;
  firstName?: string;
  lastName?: string;
};

type Place = {
  id: string;
  Pictures: string[];
  location: string;
  categories: string[];
  phone: string;
  facebook: string;
};

type DateType = {
  id: string;
  message: string;
  place: Place;
  userA: DateUser;
  userB: DateUser;
};

export default function DatesPage() {
  const router = useRouter();
  const [dates, setDates] = useState<DateType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);

  const currentUserId = user?.id;

  useEffect(() => {
    if (!user?.id) return;
    const fetchDates = async () => {
      try {
        const res = await fetch("/api/Dates");
        if (!res.ok) throw new Error("Failed to fetch dates");
        const data: DateType[] = await res.json();

        const myDates = data.filter(
          (date) =>
            date.userA.id === currentUserId || date.userB.id === currentUserId
        );

        setDates(myDates);
      } catch (err: unknown) {
        console.error(err);
        setError((err as Error).message);
      }
    };

    fetchDates();
  }, [currentUserId]);

  return (
    <div className="min-h-screen bg-pink-100 py-8 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center text-pink-700">
        My Dates
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : dates.length > 0 ? (
        <div className="flex flex-col items-center gap-8">
          {dates.map((date) => {
            const otherUser =
              date.userA.id === currentUserId ? date.userB : date.userA;

            return (
              <div
                key={date.id}
                className="bg-pink-50 rounded-2xl shadow-lg w-96 h-96 flex flex-col items-center p-6 transition hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex flex-col items-center mb-4">
                  {otherUser.profilePic ? (
                    <img
                      src={otherUser.profilePic}
                      alt={otherUser.username}
                      className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-pink-200"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-pink-200 mb-3 flex items-center justify-center">
                      <span className="text-pink-500 text-2xl">?</span>
                    </div>
                  )}
                  <p className="text-xl font-semibold text-pink-700">
                    {otherUser.username}
                  </p>
                </div>

                <div className="flex flex-col items-center ">
                  {date.message && (
                    <p className="italic text-pink-600 mb-3 text-center truncate">
                      {date.message}
                    </p>
                  )}
                  <p className="font-medium text-pink-500 mb-3 truncate underline cursor-pointer hover:text-pink-700" onClick={() => router.push(date.place!.location)}>
                    {date.place.facebook}
                  </p>
                  {date.place.Pictures[0] && (
                    <img
                      src={date.place.Pictures[0]}
                      className="w-40 h-26 object-cover rounded-lg border-2 border-pink-200 "
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-pink-400 mt-10">No dates found.</p>
      )}
      <Footer />
    </div>
  );
}
