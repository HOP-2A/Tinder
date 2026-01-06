import {
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
      <div className="flex gap-10">
        <h1 className="font-extrabold text-5xl md:text-6xl text-pink-600 drop-shadow-sm">
          LUMINATE
        </h1>{" "}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <h1 className="font-semibold text-2xl  text-pink-600 ">CONTACT</h1>{" "}
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
            <h1 className="font-semibold text-2xl  text-pink-600 ">CREDITS</h1>{" "}
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
    </div>
  );
};
