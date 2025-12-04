"use client";

import { HeartPlus } from "lucide-react";
import { SearchCheck } from "lucide-react";
import { Atom } from "lucide-react";
import { CircleUser } from "lucide-react";
import { MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";
export const Footer = () => {
  const { push } = useRouter();
  return (
    <div className="flex justify-around bottom-0 fixed left-0 right-0">
      <HeartPlus onClick={() => push("/")} />
      <SearchCheck onClick={() => push("Search")} />
      <Atom onClick={() => push("/Match")} />
      <MapPinned onClick={() => push("/Place")} />
      <CircleUser onClick={() => push("/Profile")} />
    </div>
  );
};
