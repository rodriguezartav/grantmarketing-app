import * as React from "react";
import { AppBar } from "react-admin";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    flex: 1,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  spacer: {
    flex: 1,
  },
});

const MyAppBar = (props) => {
  const classes = useStyles();
  return (
    <AppBar style={{ backgroundColor: "#67823a" }} {...props}>
      <img src="./white_icon_color1_background.png" style={{ height: 40 }} />
      <img src="./logo-text.png" style={{ height: 40 }} />

      <span className={classes.spacer} />
    </AppBar>
  );
};

export default MyAppBar;
