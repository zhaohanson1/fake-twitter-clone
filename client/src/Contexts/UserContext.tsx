import { createContext, useContext } from "react";
export type UserContext = {
  user: string | null;
  name: string | null;
  username: string | null;
  userFetched: boolean;
};

export const UserContext = createContext<UserContext>({
  user: null,
  name: null,
  username: null,
  userFetched: false,
});
export const useUserContext = () => useContext(UserContext);
