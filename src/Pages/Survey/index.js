import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from '@material-ui/core/Radio';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import axios from 'axios';
import Snackbar from "../../Components/Snackbar"


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        CovidApp
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '32ch',
  },
}));

export default function SignIn() {

  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    severity: "success",
    message: ""
  });

  const [values, setValues] = React.useState({
    kode: '1111111111',
    rumah_sakit_id: 1,
    longitude: '',
    latitude: '',
    kondisi: '',
    suhu: '',
    demam: ''
  });

  const handleChange = e => {
    let newValue = { ...values };
    newValue[e.target.name] = e.target.value;
    setValues(newValue);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar({...openSnackbar, open: false, message: ""});
  };

  
  const classes = useStyles();

  const [userAddress, setUserAddress] = React.useState('');
  
  /**
   * @method handleGetLocation
   * @summary Get user location using navigator geolocation.
   * @return {undefined}
   */
  const handleGetLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGetCoordinates, handleLocationError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  /**
   * @method handleGetCoordinates
   * @summary Set coordinates with user location coordinates.
   * @return {undefined}
   */
  const handleGetCoordinates = (position) => {
    const latitude = position.coords.latitude.toString();
    const longitude = position.coords.longitude.toString();
    setValues({...values, latitude, longitude})
    handleGetUserLocation(latitude, longitude);
  }

  /**
   * @method handleLocationError
   * @summary Alerting message of error if error occur.
   * @return {undefined}
   */
  const handleLocationError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.")
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.")
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
        break;
      default:
        alert("An unknown error occurred.")
        break;
    }
  }

  /**
   * @method handleGetUserLocation
   * @summary Get User Location using Google API
   * @param {string} latitude - User's latitude coordinates
   * @param {string} longitude - User's longitude coordinates
   * @return {undefined}
   */
  const handleGetUserLocation = async (latitude, longitude) => {
    const baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
    const apiKey = '&key=AIzaSyAtJjcjFBzjxF908drCFRGAXBF-EvefsSo';
    const url = `${baseUrl}${latitude},${longitude}${apiKey}`;

    await axios
      .get(url)
      .then((response) => {
        const userAddress = response.data.results[0].formatted_address;
        setUserAddress(userAddress);
      });
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/report`, values)
      .then(() => {
        setOpenSnackbar({...openSnackbar, open: true, severity: "success", message: "Berhasil input data"})
      })
      .catch(() => {
        setOpenSnackbar({...openSnackbar, open: true, severity: "error", message: "Terjadi Kesalahan"})
      })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography component="h1" variant="h5">
          Harap menjawab pertanyaan di bawah ini
        </Typography>
        <form className={classes.form} noValidate>
          <FormLabel component="legend" style={{marginTop: '15px'}}>Bagaimana kondisi anda sekarang?</FormLabel>
          <RadioGroup aria-label="gender" name="kondisi" value={values.kondisi} onChange={handleChange}>
            <FormControlLabel value="sangat sehat" control={<Radio />} label="Sangat Sehat" />
            <FormControlLabel value="kurang sehat" control={<Radio />} label="Kurang Sehat" />
            <FormControlLabel value="sakit" control={<Radio />} label="Sakit" />
          </RadioGroup>
          <FormLabel component="legend" style={{marginTop: '15px'}}>Berapa suhu tubuh anda sekarang?</FormLabel>
          <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-weight"
            name="suhu"
            endAdornment={<InputAdornment position="end">{'\u00b0'} C</InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            onChange={handleChange}
            labelWidth={0}
          />
        </FormControl>
          <FormLabel component="legend" style={{marginTop: '15px'}}>Apakah anda sedang sakit demam?</FormLabel>
          <RadioGroup aria-label="gender" name="demam" value={values.demam} onChange={handleChange}>
            <FormControlLabel value="ya" control={<Radio />} label="Ya" />
            <FormControlLabel value="tidak" control={<Radio />} label="Tidak" />
          </RadioGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleGetLocation}
          >
            Share My Location
          </Button>
          <p>Your Latitude: {values.latitude}</p>
          <p>Your Longitude: {values.longitude}</p>
          <p>Your Location: {userAddress}</p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={openSnackbar.open} severity={openSnackbar.severity} message={openSnackbar.message} handleClose={handleClose}/>
    </Container>
  );
}