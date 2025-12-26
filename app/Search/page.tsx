"use client";
import { useEffect, useState } from "react";
import { Heart, MessageCircle, Share } from "lucide-react";
import { User } from "../page";
import { Footer } from "../_components/Footer";

type Post = {
  user: User;
  createdAt: string | number | Date;
  id: string;
  caption: string;
  images: string[];
};

const Search = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const PostFetch = async () => {
      const res = await fetch("/api/Post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const Allposts = await res.json();
      setPosts(Allposts.message);
    };
    PostFetch();
  }, []);

  return (
    <div>
      <div className="w-full max-w-md mx-auto space-y-6 pb-20">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-2xl shadow border overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                {post.user.profilePic ? (
                  <img
                    src={post.user.profilePic.replace(/^"|"$/g, "")}
                    alt="profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                    N/A
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">{post.user.username}</p>
                <p className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {post.images?.length > 0 && (
              <div className="relative w-full aspect-square bg-black">
                <img
                  src={post.images[0]}
                  alt="post"
                  className="object-cover w-full h-fit "
                />
              </div>
            )}

            <div className="flex items-center gap-5 p-4">
              <Heart className="w-6 h-6 cursor-pointer hover:text-red-500" />
              <MessageCircle className="w-6 h-6 cursor-pointer" />
              <Share className="w-6 h-6 cursor-pointer" />
            </div>

            {post.caption && (
              <div className="px-4 pb-4">
                <p className="text-sm">
                  <span className="font-semibold mr-1">
                    {post.user.username}
                  </span>
                  {post.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-10">
        <Footer />
      </div>
    </div>
  );
};

export default Search;
