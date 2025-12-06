import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { push } = useRouter();
  const lav = () => {
    push("https://www.instagram.com/lkhagva.dorj_/");
  };
  const bat = () => {
    push("https://www.instagram.com/b1_notfound");
  };
  const ene = () => {
    push("https://www.instagram.com/reizz_el");
  };
  const dava = () => {
    push("https://www.instagram.com/d3spair_777");
  };
  const pine = () => {
    push("https://www.instagram.com/pineconemongolia/");
  };
  const turu = () => {
    push("https://www.instagram.com/turuuu10/");
  };

  return (
    <div className="flex justify-between ">
      {" "}
      <div className="flex gap-10">
        {" "}
        <h1 className="font-semibold text-4xl text-white ">LUMINATE</h1>{" "}
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <h1 className="font-semibold text-2xl text-white ">CONTACT</h1>{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>CREATORS AND DEVELOPERS:</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                lav();
              }}
            >
              LKHAGVADORJ
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                bat();
              }}
            >
              BATSUKH
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                ene();
              }}
            >
              ENEREL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                dava();
              }}
            >
              DAVAABAATAR
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <h1 className="font-semibold text-2xl text-white ">CREDITS</h1>{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>MADE IN :</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                pine();
              }}
            >
              PINECONE ACADEMY
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>ALL THANKS TO :</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                turu();
              }}
            >
              TURBOLD
            </DropdownMenuItem>
            <DropdownMenuItem>PARENTS</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>CREATORS AND DEVELOPERS:</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                lav();
              }}
            >
              LKHAGVADORJ
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                bat();
              }}
            >
              BATSUKH
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                ene();
              }}
            >
              ENEREL
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                dava();
              }}
            >
              DAVAABAATAR
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="text-white flex gap-3 ">
        {" "}
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#7e5eff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:scale-110">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
