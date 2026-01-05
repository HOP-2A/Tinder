"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
    <div className="min-h-screen bg-pink-50">
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col items-center text-center">
          <Avatar className="h-[140px] w-[140px] shadow-md mb-4">
            <AvatarImage src={myData?.profilePic} />
            <AvatarFallback className="text-xl">
              {myData?.username?.[0]}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-extrabold text-pink-600">
            {myData?.username}
          </h1>
          <Button
            className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-pink-500 hover:to-cyan-500 
          text-white font-semibold rounded-xl px-6 py-3 shadow-neon transition-all duration-300"
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
            className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              <Avatar
                className="h-10 w-10 cursor-pointer"
                onClick={() => push(`/${post.user.id}`)}
              >
                <AvatarImage src={myData?.profilePic} />
                <AvatarFallback>{myData?.username[0]}</AvatarFallback>
              </Avatar>

              <div>
                <p
                  className="font-semibold text-pink-600 text-sm cursor-pointer"
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
              <div className="relative w-full aspect-square bg-pink-100">
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
                  <span className="font-semibold text-pink-600 mr-1">
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
