import { Grid, Link } from "@mui/material";

import useUser from "../CustomHooks/useUser";
export default function DashboardHeader(props: any) {
  const [user, hasFetched] = useUser();

  function handleLogout(e: React.MouseEvent) {
    const reqOpts = {
      method: "POST",
    };
    fetch("api/auth/logout", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        if (data.redirectURI) {
          window.location.href = data.redirectURI;
        }
      });
  }
  return (
    <Grid item xs>
      <div>OkaygeBusiness {user}</div>
      <Link href="#" onClick={(e) => handleLogout(e)}>
        Logout
      </Link>
    </Grid>
  );
}
