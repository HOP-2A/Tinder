"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "../_components/Footer";
import { User } from "../page";
import { useAuth } from "@/provider/authProvider";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

type Post = {
  user: User;
  createdAt: string | number | Date;
  id: string;
  caption: string;
  images: string[];
};

type usertype = {
  age: string;
  hobbies: string[];
  id: string;
  posts: Post[];
  profilePic: string;
  username: string;
};

export default function MyProfile() {
  const { push } = useRouter();
  const [myData, setMyData] = useState<usertype>();
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const userId = user?.id;

  useEffect(() => {
    const getMyData = async () => {
      const response = await fetch("/api/User/userprof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
        }),
      });
      const data = await response.json();
      setMyData(data.user);
    };
    getMyData();
  }, [userId]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <div className="bg-white/80 backdrop-blur-md shadow-md border-b border-white/40">
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col items-center text-center">
          <Avatar className="h-[140px] w-[140px] shadow-lg mb-4 ring-2 ring-pink-300">
            <AvatarImage src={myData?.profilePic} />
            <AvatarFallback className="text-xl">
              {myData?.username?.[0]}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 drop-shadow-sm mb-4">
            {myData?.username}
          </h1>

          <Button
            className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-rose-400 hover:to-pink-400 
                     text-white font-semibold rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => push("/editProfile")}
          >
            EDIT PROFILE
          </Button>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-8 px-4 py-10">
        {myData?.posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/30 overflow-hidden
                     transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center gap-3 p-4">
              <Avatar
                className="h-10 w-10 cursor-pointer ring-1 ring-pink-200"
                onClick={() => push(`/${post.user.id}`)}
              >
                <AvatarImage src={myData?.profilePic} />
                <AvatarFallback>{myData?.username[0]}</AvatarFallback>
              </Avatar>

              <div>
                <p
                  className="font-semibold text-pink-500 text-sm cursor-pointer hover:underline"
                  onClick={() => push(`/${post.user.id}`)}
                >
                  {myData?.username}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {post.images?.length > 0 && (
              <div className="relative w-full aspect-square bg-gray-100">
                <img
                  src={post.images[0]}
                  alt="post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {post.caption && (
              <div className="px-4 pb-5 pt-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-pink-500 mr-1">
                    {myData?.username}
                  </span>
                  {post.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
