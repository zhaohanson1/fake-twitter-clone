import { useState, useEffect } from "react";

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const reqOpts = {
      method: "GET",
    };

    fetch("/api/auth/user", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUser(data.id);
        }
      });
  }, [user]);
  return user;
}
