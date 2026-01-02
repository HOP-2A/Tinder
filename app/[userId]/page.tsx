"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Footer } from "../_components/Footer";
import { User } from "../page";

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

export default function Otheruserprofile() {
  const { push } = useRouter();
  const [user, setUser] = useState<usertype>();
  const params = useParams();
  const userId = params.userId as string;

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/User/${userId}`);
      const data = await response.json();
      setUser(data.message);
    };
    getUser();
  }, [userId]);

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col items-center text-center">
          <Avatar className="h-[140px] w-[140px] shadow-md mb-4">
            <AvatarImage src={user?.profilePic} />
            <AvatarFallback className="text-xl">
              {user?.username?.[0]}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-extrabold text-pink-600">
            {user?.username}
          </h1>

          {/* {user?.hobbies?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {user.hobbies.map((hobby, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-pink-100 text-pink-600"
                >
                  {hobby}
                </span>
              ))}
            </div>
          )} */}
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-8 px-4 py-10">
        {user?.posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow-md border border-pink-100 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              <Avatar
                className="h-10 w-10 cursor-pointer"
                onClick={() => push(`/${post.user.id}`)}
              >
                <AvatarImage src={user.profilePic} />
                <AvatarFallback>{user.username[0]}</AvatarFallback>
              </Avatar>

              <div>
                <p
                  className="font-semibold text-pink-600 text-sm cursor-pointer"
                  onClick={() => push(`/${post.user.id}`)}
                >
                  {user.username}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Image */}
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
                    {user.username}
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
