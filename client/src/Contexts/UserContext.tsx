import { createContext, useContext } from "react";
export type UserContext = {
  user: string | undefined;
  name: string | undefined;
  username: string | undefined;
  userFetched: boolean;
  email: string | undefined;
};

export const UserContext = createContext<UserContext>({
  user: undefined,
  name: undefined,
  username: undefined,
  email: undefined,
  userFetched: false,
});
export const useUserContext = () => useContext(UserContext);
