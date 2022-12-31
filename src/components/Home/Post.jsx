import * as React from "react";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import moment from "moment";
import PostMenu from "./PostMenu";

export default function Post({ username, text, created, post_id, user_id }) {

  return (
    <Card variant="outlined" sx={{ margin: "30px 20%" }}>
      <Typography level="h2" sx={{ fontSize: "md",  }}>
        {text}
      </Typography>
      <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
        by {username}
      </Typography>
      <Divider />
      <CardOverflow
        variant="soft"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "background.level1"
        }}
      >
        <Typography
          level="body3"
          sx={{ fontWeight: "md", color: "text.secondary", marginTop: "4px" }}
        >
          {moment(created).fromNow(true)}
        </Typography>
        <PostMenu id={post_id} user_id={user_id} />
      </CardOverflow>
    </Card>
  );
}
