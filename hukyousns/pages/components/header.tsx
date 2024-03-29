import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import Router from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GradeIcon from "@mui/icons-material/Grade";

const Header = () => {
  const handler = (path: string) => {
    Router.push(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            style={{ fontFamily: "Century", textShadow: "2px 2px 2px #888888" }}
          >
            PassionPulse
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ml: 1, ":hover": { backgroundColor: "grey" } }}
            onClick={() => handler("./MyPage")}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ":hover": { backgroundColor: "grey" } }}
            onClick={() => handler("./home")}
          >
            <PublicIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ":hover": { backgroundColor: "grey" } }}
            onClick={() => handler("./signin")}
          >
            <LoginIcon />
          </IconButton>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ":hover": { backgroundColor: "grey" } }}
            onClick={() => handler("./signup")}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ":hover": { backgroundColor: "grey" } }}
            onClick={() => handler("./likes")}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1, ":hover": { backgroundColor: "grey" } }}
            onClick={() => handler("./super_likes")}
          >
            <GradeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
