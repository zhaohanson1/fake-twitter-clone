import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
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
          setHasFetched(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [user]);
  return [user, hasFetched];
}
