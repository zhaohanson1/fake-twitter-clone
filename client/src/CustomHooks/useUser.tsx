import { useState, useEffect } from "react";

/**
 * A hook that async fetches the current logged in user.
 * When user has been fetched, set boolean to true
 * @returns
 * user: the user id of current logged in user
 * fetched: if fetch call has finished
 */
export default function useUser() {
  const [user, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
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
          setUserId(data.id);
          setName(data.name);
          setUsername(data.username);
          setFetched(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);
  return {user, name, username, userFetched} as const;
}
