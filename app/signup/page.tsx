"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
type signuptype = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  pass: string;
};
export default function Signup() {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<signuptype>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    pass: "",
  });
  const handleSignupValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const signup = async () => {
    if (
      !inputValue.firstname.trim() ||
      !inputValue.lastname.trim() ||
      !inputValue.username.trim() ||
      !inputValue.email.trim() ||
      !inputValue.pass.trim()
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("/api/User/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: inputValue.firstname,
          lastName: inputValue.lastname,
          username: inputValue.username,
          email: inputValue.email,
          password: inputValue.pass,
        }),
      });
      if (response.ok) {
        // const token = await response.json();
        // localStorage.setItem("token", token);
        // setToken(token);
        // const decodedToken: decodedTokenType = jwtDecode(token);
        // setUser(decodedToken.data);
        toast.success("Created your account successfully");
        // push("/login");
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
  };

  const jump = () => {
    push("/login");
  };

  return (
    <div>
      <h1 className="text-5xl font-extrabold mb-16 text-cyan-400 drop-shadow-neon select-none">
        LUMINATE
      </h1>
      <div className="flex flex-col gap-5 justify-center items-center">
        <Input
          placeholder="FIRSTNAME"
          className="w-[300px]"
          name="firstname"
          value={inputValue.firstname}
          onChange={handleSignupValues}
          type="text"
        />
        <Input
          placeholder="LASTNAME"
          className="w-[300px]"
          name="lastname"
          value={inputValue.lastname}
          onChange={handleSignupValues}
          type="text"
        />
        <Input
          placeholder="USERNAME"
          className="w-[300px]"
          name="username"
          value={inputValue.username}
          onChange={handleSignupValues}
          type="text"
        />
        <Input
          placeholder="EMAIL"
          className="w-[300px]"
          name="email"
          value={inputValue.email}
          onChange={handleSignupValues}
          type="email"
        />
        <Input
          placeholder="PASSWORD"
          className="w-[300px]"
          name="pass"
          value={inputValue.pass}
          onChange={handleSignupValues}
          type="password"
        />
        <Button
          onClick={signup}
          className="bg-gradient-to-r from-purple-600 to-blue-600
            shadow-neon hover:shadow-pink-600
            transition-transform duration-300 hover:scale-105
            rounded-lg py-3 font-semibold text-lg"
        >
          SIGN UP
        </Button>
      </div>
      <div className="mt-12 flex gap-2 text-cyan-300 text-sm select-none flex justify-center">
        <span>Already have an account?</span>
        <button
          className="text-pink-500 font-semibold hover:underline hover:scale-105 transition-transform duration-200"
          onClick={jump}
        >
          LOG IN
        </button>
      </div>
    </div>
  );
}
