"use client";
import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { User } from "../page";
import { Footer } from "../_components/Footer";
import { useRouter } from "next/navigation";

type Post = {
  user: User;
  createdAt: string | number | Date;
  id: string;
  caption: string;
  images: string[];
};

const Search = () => {
  const { push } = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const PostFetch = async () => {
      const res = await fetch("/api/Post", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const Allposts = await res.json();
      setPosts(Allposts.message);
    };
    PostFetch();
  }, []);

  return (
    <div className="min-h-screen py-6">
      <div className="flex justify-end pr-6 pt-4">
        <CirclePlus
          onClick={() => push("/postCreate")}
          className="w-10 h-10 p-2 text-pink-500 bg-white/80 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition transform cursor-pointer"
        />
      </div>

      <div className="w-full max-w-md mx-auto space-y-8 py-6 px-3">
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg border border-white/30 overflow-hidden
                     transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <div className="flex items-center gap-3 p-4">
              <div
                className="w-12 h-12 rounded-full overflow-hidden bg-pink-100 flex items-center justify-center ring-1 ring-pink-200 cursor-pointer"
                onClick={() => push(`/${post.user.id}`)}
              >
                {post.user.profilePic ? (
                  <img
                    src={post.user.profilePic.replace(/^"|"$/g, "")}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-pink-400 font-semibold">
                    N/A
                  </span>
                )}
              </div>

              <div>
                <p
                  className="font-semibold text-pink-600 text-sm cursor-pointer hover:underline"
                  onClick={() => push(`/${post.user.id}`)}
                >
                  {post.user.username}
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
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {post.caption && (
              <div className="px-4 pb-5 pt-3">
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold text-pink-600 mr-1">
                    {post.user.username}
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
};

export default Search;
