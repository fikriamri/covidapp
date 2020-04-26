import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Menu from "../../Components/Menu";
import Snackbar from "../../Components/Snackbar";
import { useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert2";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        CovidApp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 600,
  },
});

export default function SurveySetting() {
  const classes = useStyles();
  const loginReducer = useSelector((state) => state.loginReducer);
  const [idRumahSakit, setIdRumahSakit] = React.useState("");
  const [namaRumahSakit, setNamaRumahSakit] = React.useState("");
  const [cronLower, setCronLower] = React.useState("");
  const [errorCronLower, setErrorCronLower] = React.useState("");
  const [cronUpper, setCronUpper] = React.useState("");
  const [errorCronUpper, setErrorCronUpper] = React.useState("");
  const [cronStart, setCronStart] = React.useState("");
  const [cronStop, setCronStop] = React.useState("");

  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    severity: "success",
    message: "",
  });

  useEffect(() => {
    // Get Data Rumah Sakit
    const { token } = loginReducer;
    const payload = token && JSON.parse(window.atob(token.split(".")[1]));
    let idrs = "";
    if (payload) {
      // setIdRumahSakit(payload.rumah_sakit_id)
      // idrs = payload.rumah_sakit_id
      setIdRumahSakit("1");
      idrs = "1";
    }

    const convertTime = (time) => {
      if (time[5] === "A") {
        time = time.substring(0, 5);
      } else if (time[5] === "P") {
        const hour = parseInt(time.substring(0, 5), 10) + 12;
        const minute = time.substring(3, 5);
        time = `${hour === 24 ? "00" : hour}:${minute}`;
      }
      return time;
    };

    axios
      .get(`https://api.warung999.com/rumahsakit?id=${idrs}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let { nama, lower, upper, start, stop } = res.data;

        start = convertTime(start);
        stop = convertTime(stop);

        setNamaRumahSakit(nama);
        setCronLower(lower);
        setCronUpper(upper);
        setCronStart(start);
        setCronStop(stop);
      })
      .catch((err) => {
        setOpenSnackbar({
          ...openSnackbar,
          open: true,
          severity: "error",
          message: "Terjadi Kesalahan",
        });
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar({ ...openSnackbar, open: false, message: "" });
  };

  const reverseTime = (time) => {
    const hour = parseInt(time.substring(0, 5), 10);
    if (hour <= 12) {
      return `${time}AM`;
    } else {
      const minute = time.substring(3, 5);
      return `${hour - 12}:${minute}PM`;
    }
  };

  const handleCronLower = (e) => {
    let { value } = e.target;
    value = parseInt(value, 10);
    if (value < 1) {
      setErrorCronLower("Harus lebih dari 1");
    } else if (value > 12) {
      setErrorCronLower("Harus kurang dari 12");
    } else if (value > cronUpper) {
      setErrorCronLower("Tidak boleh lebih dari 'Jarak jam terbesar'");
    } else {
      setErrorCronLower("");
      setCronLower(value);
    }
  };
  const handleCronUpper = (e) => {
    let { value } = e.target;
    value = parseInt(value, 10);
    if (value < 1) {
      setErrorCronUpper("Harus lebih dari 1");
    } else if (value > 12) {
      setErrorCronUpper("Harus kurang dari 12");
    } else if (value < cronLower) {
      setErrorCronUpper("Tidak boleh kurang dari 'Jarak jam terkecil'");
    } else {
      setErrorCronUpper("");
      setCronUpper(value);
    }
  };
  const handleCronStart = (e) => {
    setCronStart(e.target.value);
  };
  const handleCronStop = (e) => {
    setCronStop(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { token } = loginReducer;
    const body = {
      lower: cronLower.toString(),
      upper: cronUpper.toString(),
      start: reverseTime(cronStart),
      stop: reverseTime(cronStop),
    };
    axios
      .put(`https://api.warung999.com/rumahsakit?id=${idRumahSakit}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        swal.fire("Berhasil", "Berhasil mengubah setting", "success");
      })
      .catch((err) => {
        setOpenSnackbar({
          ...openSnackbar,
          open: true,
          severity: "error",
          message: "Terjadi Kesalahan",
        });
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Menu />
      <div className={classes.paper}>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="nama"
              label="Nama"
              disabled
              value={namaRumahSakit}
              autoComplete="Nama"
            />
            <TextField
              error={errorCronLower !== ""}
              variant="outlined"
              margin="normal"
              fullWidth
              type="number"
              id="cronLower"
              label="Jarak jam terkecil"
              value={cronLower}
              helperText={errorCronLower}
              onChange={handleCronLower}
            />
            <TextField
              error={errorCronUpper !== ""}
              variant="outlined"
              margin="normal"
              fullWidth
              type="number"
              id="cronUpper"
              label="Jarak jam terbesar"
              value={cronUpper}
              helperText={errorCronUpper}
              onChange={handleCronUpper}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cronStart"
              label="Survey Mulai"
              type="time"
              value={cronStart}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={handleCronStart}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cronStop"
              label="Survey Akhir"
              type="time"
              value={cronStop}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              onChange={handleCronStop}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </form>
        </Grid>
      </div>
      <Snackbar
        open={openSnackbar.open}
        severity={openSnackbar.severity}
        message={openSnackbar.message}
        handleClose={handleClose}
      />
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
