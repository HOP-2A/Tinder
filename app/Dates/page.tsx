"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
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
  const [dates, setDates] = useState<DateType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);

  const currentUserId = user?.id;

  useEffect(() => {
    if (!currentUserId) return;
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-gray-900 drop-shadow-sm">
        My Dates
      </h1>

      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : dates.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {dates.map((date) => {
            const otherUser =
              date.userA.id === currentUserId ? date.userB : date.userA;

            return (
              <div
                key={date.id}
                className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg w-80 h-96
                         flex flex-col items-center p-6 transition-transform duration-300
                         hover:scale-105 hover:shadow-2xl border border-white/30"
              >
                <div className="flex flex-col items-center mb-4">
                  {otherUser.profilePic ? (
                    <img
                      src={otherUser.profilePic}
                      alt={otherUser.username}
                      className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-pink-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-pink-200 mb-3 flex items-center justify-center shadow-sm">
                      <span className="text-pink-600 text-2xl">?</span>
                    </div>
                  )}
                  <p className="text-xl font-semibold text-gray-900">
                    {otherUser.username}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  {date.message && (
                    <p className="italic text-gray-700 text-center truncate">
                      {date.message}
                    </p>
                  )}

                  <p
                    className="font-medium text-pink-500 underline cursor-pointer hover:text-pink-700 transition"
                    onClick={() =>
                      window.open(
                        date.place.location,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {date.place.facebook}
                  </p>

                  {date.place.Pictures[0] && (
                    <img
                      src={date.place.Pictures[0]}
                      alt={date.place.facebook}
                      className="w-40 h-28 object-cover rounded-xl border border-gray-200 shadow-sm"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex justify-center items-center relative z-10">
          <div className="w-16 h-16 border-4 border-white/30 border-t-pink-400 rounded-full animate-spin"></div>
        </div>
      )}

      <Footer />
    </div>
  );
}
