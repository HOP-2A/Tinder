"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
// import { useUser } from "../providers/AuthContextt";
import Link from "next/link";

type UserType = {
  createdAt: Date;
  email: string;
  followers: string[];
  following: string[];
  password: string;
  updatedAt: Date;
  username: string;
  profilePicture?: string;
};

type PostType = {
  caption: string;
  createdAt: Date;
  likes: number[];
  postImages: string[];
  updatedAt: Date;
  user: UserType;
};

export default function ProfilePage() {
  // const { user, token } = useUser();
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/Profile", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.log("Error fetching profile data:", err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  if (!user)
    return (
      <div className="p-10 text-center">
        <div></div>
        <Link href="/login" className="text-blue-500 underline">
          Login
        </Link>
      </div>
    );

  const name = user.username || "Unknown";
  const image = user.profilePicture || "/default-avatar.png";

  return (
    <div className="w-full max-w-sm mx-auto mt-10 relative">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {}
        <div className="relative h-96 w-full">
          <Image src={image} alt={name} fill className="object-cover" />

          {}
          <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
            <div className="text-3xl font-bold">{name}</div>
            <div className="text-lg opacity-90">{user.email}</div>
          </div>
        </div>

        {}
        <div className="p-5">
          <div className="font-semibold text-xl mb-2">About</div>
          <div className="text-gray-700">{user.bio || "No bio added yet."}</div>
        </div>

        {}
        <div className="flex justify-around p-4">
          <button className="bg-white border border-red-500 text-red-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl">
            ✖
          </button>

          <button className="bg-white border border-green-500 text-green-500 w-16 h-16 rounded-full flex items-center justify-center text-2xl">
            ❤
          </button>
        </div>
      </div>
    </div>
  );
}
