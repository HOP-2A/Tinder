"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import { toast } from "sonner";
type logintype = {
  email: string;
  pass: string;
};

export default function Login() {
  const { push } = useRouter();
  const [inputValue, setInputValue] = useState<logintype>({
    email: "",
    pass: "",
  });
  const handleLoginValues = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const login = async () => {
    if (!inputValue.email.trim() || !inputValue.pass.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      const response = await fetch("/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        toast.success("Logged in successfully");
        push("/");
      } else {
        toast.error("Email or Password incorrect. TRY AGAIN");
      }
    } catch {
      toast.error("Network error. Please try again.");
    }
  };
  const usreh = () => {
    push("/signup");
  };
  console.log(inputValue);
  return (
    <div>
      {" "}
      <h1 className="text-5xl font-extrabold mb-16 text-cyan-400 drop-shadow-neon select-none">
        LUMINATE
      </h1>
      <div className="flex flex-col gap-5  justify-center items-center">
        <Input
          placeholder="ENTER YOUR EMAIL"
          className="bg-[#121023] text-cyan-300 border-cyan-600 focus:border-pink-500 focus:ring-pink-500
            rounded-lg px-4 py-3 placeholder-cyan-500
            transition-shadow duration-300 w-[300px]"
          name="email"
          value={inputValue.email}
          onChange={handleLoginValues}
          type="email"
          spellCheck={false}
          autoComplete="email"
        />
        <Input
          placeholder="ENTER YOUR PASSWORD"
          className="bg-[#121023] text-cyan-300 border-cyan-600 focus:border-pink-500 focus:ring-pink-500
            rounded-lg px-4 py-3 placeholder-cyan-500
            transition-shadow duration-300  w-[300px]"
          name="pass"
          value={inputValue.pass}
          onChange={handleLoginValues}
          type="password"
          autoComplete="current-password"
        />
        <Button
          onClick={login}
          className="bg-gradient-to-r from-purple-600 to-blue-600
            shadow-neon hover:shadow-pink-600
            transition-transform duration-300 hover:scale-105
            rounded-lg py-3 font-semibold text-lg"
        >
          Log in
        </Button>
      </div>
      <div className="mt-12 flex gap-2 text-cyan-300 text-sm select-none justify-center">
        <span>Dont have an account?</span>
        <button
          className="text-pink-500 font-semibold hover:underline hover:scale-105 transition-transform duration-200"
          onClick={usreh}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}
