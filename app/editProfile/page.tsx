"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@/provider/authProvider";
import { Footer } from "../_components/Footer";

type usertype = {
  age: string;
  hobbies: string[];
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
};

export default function EditProfile() {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstname: "",
    lastname: "",
    profilePicture: "",
  });

  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id);
  const userId = user?.id;

  const handleInputValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const editpro = async () => {
    setLoading(true);
    try {
      await fetch("/api/User/editProfile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          firstName: inputValues.firstname,
          lastName: inputValues.lastname,
          profilePic: inputValues.profilePicture,
        }),
      });
      toast.success("Profile updated successfully");
      push("/Profile");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center px-4 py-12">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-pink-600 mb-2">
        Edit Profile 💕
      </h1>
      <p className="text-gray-500 mb-8 text-center">
        Update your personal information
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-pink-100 p-6 space-y-5">
        <Input
          placeholder="First name"
          name="firstname"
          value={inputValues.firstname}
          onChange={handleInputValues}
          className="border-pink-200 focus:border-pink-400"
        />

        <Input
          placeholder="Last name"
          name="lastname"
          value={inputValues.lastname}
          onChange={handleInputValues}
          className="border-pink-200 focus:border-pink-400"
        />

        <Input
          placeholder="Profile picture URL"
          name="profilePicture"
          value={inputValues.profilePicture}
          onChange={handleInputValues}
          className="border-pink-200 focus:border-pink-400"
        />

        <Button
          onClick={editpro}
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl py-3 transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Footer />
    </div>
  );
}
