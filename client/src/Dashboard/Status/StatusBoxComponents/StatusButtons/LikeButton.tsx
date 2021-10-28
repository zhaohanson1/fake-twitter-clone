import { Box, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";

export default function LikeButton(props: any) {
  const { status, user } = props;
  const [liked, setLiked] = useState(false);
  const [buttonStyle, setbuttonStyle] = useState({ color: "default" });
  //Hack
  const [numOfLikes, setNumOfLikes] = useState(status.numberOfLikes);

  useEffect(() => {
    // check if current user likes post and setLikes
    let isMounted = true;
    if (user !== undefined) {
      const reqOpt = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`/api/status/${status._id}/likedBy/${user}`, reqOpt)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && isMounted) {
            setLiked(data.liked);
            setbuttonStyle({ color: data.liked ? "red" : "default" });
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [user, liked]);

  const handleClick = (e: React.MouseEvent) => {
    if (!user) {
      return;
    }
    e.preventDefault();
    const reqOpt = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user }),
    };

    if (!liked) {
      fetch(`/api/status/${status._id}/like`, reqOpt)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLiked(true);
            setNumOfLikes(numOfLikes + 1);
            setbuttonStyle({ color: "red" });
          }
        });
    } else {
      fetch(`/api/status/${status._id}/unlike`, reqOpt)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLiked(false);
            setNumOfLikes(numOfLikes - 1);
            setbuttonStyle({ color: "default" });
          }
        });
    }
  };

  return (
    <Box>
      <IconButton sx={buttonStyle} onClick={handleClick}>
        <FavoriteIcon id="like-button"></FavoriteIcon>
        {numOfLikes}
      </IconButton>
    </Box>
  );
}
