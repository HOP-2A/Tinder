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
import { Footer } from "../_components/Footer";

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
    } catch {
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images: imageurl,
        caption,
        userId,
      }),
    });

    if (response.ok) {
      toast.success("Posted successfully!");
      router.push("/");
    } else {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-extrabold text-pink-600 mb-2">
        Create a New Post 💕
      </h1>
      <p className="text-gray-500 mb-8 text-center">
        Share your favorite moments with the community
      </p>

      <Card className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-pink-100">
        <CardHeader className="text-center">
          <CardTitle className="text-pink-600 text-2xl">Upload Image</CardTitle>
          <CardDescription className="text-gray-500">
            Choose a photo and add a caption
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="border-pink-200 focus:border-pink-400"
            />
            <Button
              onClick={uploadImage}
              className="bg-pink-500 hover:bg-pink-600 text-white w-full sm:w-auto"
            >
              Upload
            </Button>
          </div>

          {imageurl && (
            <div className="flex justify-center">
              <img
                src={imageurl}
                alt="Preview"
                className="rounded-xl w-full max-w-md h-[280px] object-cover shadow-md"
              />
            </div>
          )}

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="w-full border border-pink-200 rounded-xl p-3 focus:ring-2 focus:ring-pink-300 focus:outline-none resize-none"
          />
        </CardContent>

        <CardFooter>
          <Button
            onClick={() => postUusgeh(user?.id as string)}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white text-lg rounded-xl"
          >
            Create Post
          </Button>
        </CardFooter>
      </Card>
      <Footer />
    </div>
  );
}
