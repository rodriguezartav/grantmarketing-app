import { Layout } from "react-admin";
import MyMenu from "./Menu";
import Appbar from "./Appbar";
import merge from "lodash/merge";
import indigo from "@material-ui/core/colors/green";
import pink from "@material-ui/core/colors/lightGreen";
import red from "@material-ui/core/colors/red";

import { createMuiTheme } from "@material-ui/core/styles";
import { defaultTheme } from "react-admin";

const myTheme = merge({}, defaultTheme, {
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    text: { primary: "rgba(0, 0, 0, 0.74)", secondary: "rgba(0, 0, 0, 0.54)" },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  overrides: {
    MuiButton: {
      // override the styles of all instances of this component
      root: {
        // Name of the rule
        color: "white", // Some CSS
      },
    },
  },
});
const MyLayout = (props) => (
  <Layout {...props} theme={myTheme} appBar={Appbar} menu={MyMenu} />
);

export default MyLayout;
