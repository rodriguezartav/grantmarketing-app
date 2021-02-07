import React, { useState, Fragment } from "react";
import { useLogin, useNotify, Notification, useTranslate } from "react-admin";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let apiUrl = process.env.REACT_APP_API_URL + "/api";

export default () => {
  const classes = useStyles();
  const translate = useTranslate();
  const [phone, setPhone] = useState("");

  const [code, setCode] = useState("");
  const [phoneView, setPhoneView] = useState(true);

  React.useEffect(() => {
    if (window.location.pathname == "/code") {
      setPhoneView(false);
      setPhone(window.location.search.replace("?phone=", ""));
    }
  }, []);

  const login = useLogin();
  const notify = useNotify();
  const send = (e) => {
    e.preventDefault();
    const request = new Request(apiUrl + "/login/getCode", {
      method: "POST",
      body: JSON.stringify({ phone: phone }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return setPhoneView(false);
      })
      .catch((error) => {
        notify(error.message || "login.error", "warning");
      });
  };

  const submit = (e) => {
    e.preventDefault();
    const request = new Request(apiUrl + "/login/autenticate", {
      method: "POST",
      body: JSON.stringify({
        code: code,
        phone: phone,
        applicationSid: process.env.REACT_APP_APPLICATION_SID,
        endpoint:
          navigator.userAgent.toLowerCase() +
          Math.floor(Math.random() * 1000 + 1),
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          console.log(response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((json) => {
        const { token, twilioWorkerToken, twilioAccessToken } = json;
        return login({
          token,
          twilioWorkerToken,
          twilioAccessToken,
        }).catch(() => notify("login.invalid", "warning"));
      })
      .catch((error) => {
        notify("login.invalid", "warning");
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {translate("Login")}
        </Typography>
        {phoneView ? (
          <Fragment>
            <form onSubmit={send} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {translate("Send")}
              </Button>
            </form>
          </Fragment>
        ) : (
          <Fragment>
            <form onSubmit={submit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="code"
                label={"Security Code"}
                name="code"
                autoFocus
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </Fragment>
        )}
      </div>
      <Box mt={8}></Box>
      <Notification />
    </Container>
  );
};
