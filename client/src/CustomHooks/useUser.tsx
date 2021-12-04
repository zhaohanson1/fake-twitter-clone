import { useState, useEffect } from "react";

/**
 * A hook that async fetches the current logged in user.
 * When user has been fetched, set boolean to true
 * @returns
 * user: the user id of current logged in user
 * fetched: if fetch call has finished
 */
export default function useUser() {
  const defaultValues = {
    user: undefined,
    name: undefined,
    username: undefined,
    email: undefined,
  };

  const [userValues, setUserValues] = useState(defaultValues);
  const [userFetched, setFetched] = useState(false);
  useEffect(() => {
    let isMounted = true;

    const reqOpts = {
      method: "GET",
    };

    fetch("/api/auth/user", reqOpts)
      .then((result) => result.json())
      .then((data) => {
        if (isMounted) {
          setUserValues({
            user: data.id,
            name: data.name,
            username: data.username,
            email: data.email,
          });

          setFetched(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [userValues.user]);
  return { ...userValues, userFetched } as const;
}
