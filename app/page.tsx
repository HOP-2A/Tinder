"use client";
// import { useUser } from "@clerk/nextjs";
// import { Footer } from "./_components/Footer";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import React, { useState } from "react";
// import { Heart, X, Star } from "lucide-react";

// export default function Home() {
//   const { push } = useRouter();
//   const { isSignedIn, isLoaded } = useUser();

//   useEffect(() => {
//     if (!isLoaded) return; // wait until clerk loads

//     if (isSignedIn === false) {
//       push("/heloo");
//     }
//   }, [isLoaded, isSignedIn, push]);

//   return (
//     <div className="h-screen bg-cover bg-center bg-black">

//       <div>
//         <Footer />
//       </div>
//     </div>
//   );
// }

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { Heart, X } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Anna",
    age: 19,
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: 2,
    name: "Mike",
    age: 21,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    id: 3,
    name: "Saraa",
    age: 20,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  },
];

export default function SwipePage() {
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const handleDragEnd = (_event: unknown, info: { offset: { x: number } }) => {
    if (!info || !info.offset) return;

    if (info.offset.x > 120) {
      swipe("right");
    } else if (info.offset.x < -120) {
      swipe("left");
    }
  };

  const swipe = (dir: string) => {
    console.log("swiped:", dir);
    setIndex((prev) => prev + 1);
    x.set(0);
  };

  const user = users[index];

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        No more users
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-white">
      <div className="relative w-[90vw] max-w-md h-[65vh]">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          whileTap={{ scale: 1.03 }}
          style={{
            x,
            rotate,
            backgroundImage: `url(${user.img})`,
          }}
          className="absolute w-full h-full rounded-3xl shadow-xl bg-cover bg-center"
        >
          <div className="absolute bottom-0 w-full p-4 text-white bg-gradient-to-t from-black/70 to-transparent rounded-b-3xl">
            <h2 className="text-xl font-semibold">
              {user.name}, {user.age}
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Buttons */}
      <div className="flex gap-8 mt-6">
        <button
          onClick={() => swipe("left")}
          className="w-14 h-14 bg-white rounded-full shadow flex items-center justify-center"
        >
          <X className="text-red-500" />
        </button>
        <button
          onClick={() => swipe("right")}
          className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Heart className="text-green-500" />
        </button>
      </div>
    </div>
  );
}
