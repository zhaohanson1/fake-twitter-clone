import { createContext, useContext } from "react";
export type UserContext = {
  user: string | null;
  userFetched: boolean;
};

export const UserContext = createContext<UserContext>({
  user: null,
  userFetched: false,
});
export const useUserContext = () => useContext(UserContext);
