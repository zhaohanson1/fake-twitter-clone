import { Grid, Link } from "@mui/material";

import useUser from "../useUser";
export default function DashboardNav(props: any) {
  const user = useUser();

  function handleLogout(e: React.MouseEvent) {
    const reqOpts = {
      method: "POST",
    };
    console.log(user);
    fetch("api/auth/logout", reqOpts)
      .then((res) => res.json())
      .then((data) => {
        console.log(user);
        if (data.redirectURI) {
          window.location.href = data.redirectURI;
        }
      });
  }
  return (
    <Grid item xs>
      <div>OkaygeBusiness {user}</div>
      <Link href="" onClick={(e) => handleLogout(e)}>
        Logout
      </Link>
    </Grid>
  );
}
