"use client";

import {
  Aperture,
  HeartPlus,
  Atom,
  CircleUser,
  MessageCircleHeart,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export const Footer = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const iconClass = (path: string) =>
    `w-6 h-6 transition-colors duration-200 ${
      pathname === path ? "text-rose-500" : "text-gray-400 hover:text-rose-500"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200">
      <div className="max-w-md mx-auto flex justify-around items-center py-3 px-4">
        <Aperture
          className={iconClass("/post")}
          onClick={() => push("/post")}
        />
        <Atom className={iconClass("/Match")} onClick={() => push("/Match")} />

        <div
          onClick={() => push("/")}
          className="w-12 h-12 bg-rose-500 rounded-full flex items-center justify-center shadow-md transform transition-transform duration-200 hover:scale-110"
        >
          <HeartPlus className="text-white w-6 h-6" />
        </div>

        <MessageCircleHeart
          className={iconClass("/Dates")}
          onClick={() => push("/Dates")}
        />
        <CircleUser
          className={iconClass("/Profile")}
          onClick={() => push("/Profile")}
        />
      </div>
    </div>
  );
};
