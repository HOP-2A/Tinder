"use client";

import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type MatchUser = {
  id: string;
  username: string;
  profilePic?: string | null;
  firstName?: string;
  lastName?: string;
};

type MatchItem = {
  id: string;
  userA: MatchUser;
  userB: MatchUser;
  userAId: string;
  userBId: string;
};

export default function Match() {
  const { push } = useRouter();
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);

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

  const myMatches = matches.filter(
    (item) => item.userA.id === user?.id || item.userB.id === user?.id
  );

  if (!myMatches.length) {
    return (
      <div className="min-h-screen bg-pink-50 py-8 text-center">
        No matches yet
      </div>
    );
  }

  const getOtherUser = (match: MatchItem) => {
    return match.userA.id === user?.id ? match.userB : match.userA;
  };

  const handleChoosePlace = () => {
    push("/Place");
  };

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center text-pink-700">
          Your Matches
        </h1>
        <ul className="space-y-4">
          {myMatches.map((match) => {
            const otherUser = getOtherUser(match);
            return (
              <li
                key={match.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={otherUser.profilePic || "/avatar-placeholder.jpg"}
                    alt={`${otherUser.username}'s profile picture`}
                    className="w-14 h-14 rounded-full object-cover border border-gray-200"
                  />
                  <span className="font-medium text-gray-800">
                    {otherUser.username}
                  </span>
                </div>
                <button
                  onClick={handleChoosePlace}
                  className="px-4 py-2 bg-pink-200 text-pink-800 rounded-lg hover:bg-pink-300 transition"
                >
                  Choose Place
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
