"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { upload } from "@vercel/blob/client";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";

export default function PostCreate() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const [caption, setCaption] = useState("");
  const [imageurl, setImageurl] = useState("");
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  };
  const uploadImage = async () => {
    if (!file) {
      toast.error("Please select an image first.");
      return;
    }
    try {
      const uploaded = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
      });
      setImageurl(uploaded.url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed. Try again.");
    }
  };
  const postUusgeh = async (userId: string) => {
    if (!imageurl) {
      toast.error("Please upload an image first.");
      return;
    }
    const response = await fetch("/api/Post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: imageurl,
        caption,
        userId: userId,
      }),
    });
    if (response.ok) {
      toast.success("Posted successfully!");
      router.push("/");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div>
      {" "}
      <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-neon fixed top-4 left-6 z-50">
        LUMINATE
      </h1>
      <div className="pt-20 text-center text-3xl font-semibold text-yellow-400">
        Create a <span className="text-pink-400">New Post</span>
      </div>
      <Card className="w-full max-w-2xl mt-10 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-neon">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-center text-2xl">
            Upload Your Image
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Share your creativity with the world 🌍
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="bg-transparent text-white border-cyan-400"
            />
            <Button
              onClick={uploadImage}
              className="bg-cyan-500 hover:bg-pink-500 transition-all"
            >
              Upload
            </Button>
          </div>

          {imageurl && (
            <div className="mt-6 flex justify-center">
              <img
                src={imageurl}
                alt="Uploaded Preview"
                className="rounded-xl w-full max-w-md h-[300px] object-cover border border-cyan-400 shadow-inner"
              />
            </div>
          )}

          <textarea
            placeholder="Write a caption..."
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            name="caption"
            rows={4}
            className="w-full bg-[#121023] text-cyan-300 p-3 rounded-lg border border-cyan-600 focus:border-pink-500 focus:ring-pink-500 transition-shadow duration-300 resize-none"
          />
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => postUusgeh(user?.id as string)}
            className="w-full bg-cyan-600 hover:bg-pink-600 shadow-neon transition-transform duration-300 hover:scale-105"
          >
            Create Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
