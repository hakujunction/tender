import { auth } from "./auth";
import { User } from "./types";

type UserWindow = Window & {
  user: User;
};

export const getUser = async () => {
  if (typeof window === "undefined") {
    const session = await auth();

    if (!session?.user) {
      throw new Error("No user found");
    }

    return session.user as User;
  }

  // @ts-ignore
  return (window as UserWindow).user as User;
};
