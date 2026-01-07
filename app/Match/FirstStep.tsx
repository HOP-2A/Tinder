import { useUser } from "@clerk/nextjs";
import { MatchItem, MatchUser } from "./page";
import { useAuth } from "@/provider/authProvider";
import { Footer } from "../_components/Footer";

export const FirstStep = ({
  setStep,
  matches,
  setChosenUser,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  matches: MatchItem[] | null;
  setOtherUser: React.Dispatch<React.SetStateAction<MatchUser | null>>;
  setChosenUser: React.Dispatch<React.SetStateAction<MatchUser | null>>;
}) => {
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id) as { user: MatchUser | null };

  const getOtherUser = (match: MatchItem) => {
    return match.userA.id === user?.id ? match.userB : match.userA;
  };

  return (
    <div className="min-h-screen relative py-8 flex flex-col overflow-hidden">
      <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-40 -right-32 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>

      <div className="max-w-md mx-auto flex-1 relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900 drop-shadow-sm">
          Your Matches
        </h1>

        {!matches ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-pink-400 rounded-full animate-spin"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            No matches yet 😢
          </div>
        ) : (
          <ul className="space-y-5">
            {matches.map((match) => {
              const otherUser = getOtherUser(match);
              return (
                <li
                  key={match.id}
                  className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg 
                         hover:shadow-2xl transform hover:-translate-y-2 transition cursor-pointer border border-white/30 gap-4"
                  onClick={() => setChosenUser(otherUser)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={otherUser.profilePic || "/avatar-placeholder.jpg"}
                      alt={`${otherUser.username}'s profile picture`}
                      className="w-14 h-14 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                    <span className="font-medium text-gray-900">
                      {otherUser.username}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setChosenUser(otherUser);
                      setStep(2);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold rounded-xl shadow hover:shadow-lg hover:scale-105 transition transform"
                  >
                    Choose Place
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
};
