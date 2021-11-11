import { useState, useEffect } from "react";

/**
 * A hook that async fetches the current logged in user.
 * When user has been fetched, set boolean to true
 * @returns
 * user: the user id of current logged in user
 * fetched: if fetch call has finished
 */
export default function useUser() {
  const [user, setUser] = useState(null);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    let isMounted = true;

    const reqOpts = {
      method: "GET",
    };

    fetch("/api/auth/user", reqOpts)
      .then((result) => result.json())
      .then((data) => {
        if (isMounted) {
          setUser(data.id);
          setFetched(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);
  return [user, fetched] as const;
}
