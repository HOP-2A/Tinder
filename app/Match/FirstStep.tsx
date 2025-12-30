import { useUser } from "@clerk/nextjs";
import { MatchItem, MatchUser } from "./page";
import { useAuth } from "@/provider/authProvider";
import { Footer } from "../_components/Footer";

export const FirstStep = ({
  setStep,
  matches,
  chosenUser,
  setOtherUser,
  setChosenUser,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  otherUser?: MatchUser | null;
  matches: MatchItem[] | null;
  chosenUser?: MatchUser | null;
  setOtherUser: React.Dispatch<React.SetStateAction<MatchUser | null>>;
  setChosenUser: React.Dispatch<React.SetStateAction<MatchUser | null>>;
}) => {
  const { user: clerkUser } = useUser();
  const { user } = useAuth(clerkUser?.id) as { user: MatchUser | null };
  const getOtherUser = (match: MatchItem) => {
    return match.userA.id === user?.id ? match.userB : match.userA;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-300 via-peach-400 to-mauve-200 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-center text-pink-700">
          Your Matches
        </h1>
        <ul className="space-y-4">
          {matches?.map((match) => {
            const otherUser = getOtherUser(match);
            setOtherUser(otherUser);
            return (
              <div
                key={match.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow hover:shadow-md transition "
                onClick={() => {
                  setChosenUser(otherUser);
                }}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={otherUser.profilePic || "/avatar-placeholder.jpg"}
                    alt={`${otherUser.username}'s profile picture`}
                    className="w-14 h-14 rounded-full object-cover border border-gray-200"
                  />
                  <span className="font-medium text-gray-800">
                    {otherUser.username}
                  </span>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 bg-pink-200 text-pink-800 rounded-lg hover:bg-pink-300 transition"
                >
                  Choose Place
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      <Footer />;
    </div>
  );
};
