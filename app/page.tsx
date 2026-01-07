"use client";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { Footer } from "./_components/Footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Heart, X } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/provider/authProvider";

export type User = {
  id: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePic: string;
};

export default function SwipePage() {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const { push } = useRouter();
  const { isSignedIn, isLoaded } = useUser();
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);

  const filterData = usersData.filter((item) => item.id !== user?.id);

  const users = filterData[index];

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (!info || !info.offset) return;

    if (info.offset.x > 120) {
      HandleSwipe(users.id, true);
    } else if (info.offset.x < -120) {
      HandleSwipe(users.id, false);
    }
  };

  const HandleSwipe = async (toUserId: string, isLike: boolean) => {
    setIndex((prev) => prev + 1);
    x.set(0);
    await fetch("/api/Swipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fromUserId: user?.id, toUserId, isLiked: isLike }),
    });
  };
  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn === false) {
      push("/heloo");
    }
  }, [isLoaded, isSignedIn, push]);

  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch("/api/User/userWithPost", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const users = await res.json();
      setUsersData(users);
    };
    userFetch();
  }, []);

  if (!users) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400 bg-gradient-to-b  to-mauve-200">
        <div className="flex-1 flex justify-center items-center relative z-10">
          <div className="w-16 h-16 border-4 border-white/30 border-t-pink-400 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-200 via-pink-300 to-purple-400">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex items-center justify-end px-4 py-3 sm:px-6">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-6">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[55vh] sm:h-[60vh] md:h-[65vh]">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={{ scale: 1.03 }}
              style={{
                x,
                rotate,
                backgroundImage: `url(${users?.profilePic})`,
              }}
              className="absolute w-full h-full rounded-2xl sm:rounded-3xl shadow-2xl bg-cover bg-center border border-white/30"
            >
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-4 sm:p-5 text-white">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold drop-shadow">
                  {users?.username}
                </h2>
              </div>
            </motion.div>
          </div>

          <div className="flex gap-6 sm:gap-10 mt-6 sm:mt-8">
            <button
              onClick={() => HandleSwipe(users.id, false)}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80 backdrop-blur shadow-xl flex items-center justify-center active:scale-95 sm:hover:scale-110 transition"
            >
              <X className="text-rose-500" size={24} />
            </button>
            <button
              onClick={() => HandleSwipe(users.id, true)}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80 backdrop-blur shadow-xl flex items-center justify-center active:scale-95 sm:hover:scale-110 transition"
            >
              <Heart className="text-pink-500" size={24} />
            </button>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
