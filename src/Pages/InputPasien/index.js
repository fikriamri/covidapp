import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";
import GoogleMaps from "../../Components/GoogleMaps";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from '@material-ui/core/Radio';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';
import Menu from "../../Components/Menu";
import Snackbar from "../../Components/Snackbar";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://elated-bose-485233.netlify.app/">
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
}));

export default function InputPasien() {

  const history = useHistory();
  const loginReducer = useSelector(state => state.loginReducer);

  const [openSnackbar, setOpenSnackbar] = React.useState({
    open: false,
    severity: "success",
    message: ""
  });

  const [openBackdrop, setOpenBackdrop] = React.useState(false);

  const [state, setState] = React.useState({
    nama: '',
    nomorHandphone: '',
    tanggalLahir: '2020-04-04',
    jenisKelamin: 'perempuan',
    kode: '',
    status: '',
    email: '',
    address: null,
    markers: {
      position: {
        lat: -6.2123751,
        lng: 106.8205107
      },
      key: Date.now(),
    },
    mapCenter: { lat: -6.2123751, lng: 106.8205107 },
    access_token: "AIzaSyAtJjcjFBzjxF908drCFRGAXBF-EvefsSo",
    mapRef: null,
    lat: -6.2123751,
    lng: 106.8205107
  })
  
  const handleChange = e => {
    console.log("nilai state ", state)
    let newValue = { ...state };
    newValue[e.target.name] = e.target.value;
    setState(newValue);
  };

  const handleMapClick = async event => {
    let mapRef = event.latLng;
    const config = {
      method: "GET",
      url:
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        mapRef.lat() +
        "," +
        mapRef.lng() +
        "&key=" +
        state.access_token
    };
    await axios(config)
      .then((response) => {
        setState({
          ...state,
          markers: {
            position: { lat: mapRef.lat(), lng: mapRef.lng() },
            key: Date.now()
          },
          mapCenter: { lat: mapRef.lat(), lng: mapRef.lng() },
          lat: mapRef.lat(),
          lng: mapRef.lng(),
          address: response.data.results[0].formatted_address
        })
      })
      .catch((error) => {
        alert("Oooppss!", "Ada yang error!", "error");
      });
  };

  // Function for loading map
  const handleMapLoad = map => {
    const _mapComponent = map;
  };

  useEffect(() => {
    console.log("kepanggil")
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      axios
        .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${state.access_token}`)
        .then((response) => {
          console.log(response);
          setState({
            ...state,
            markers: {
              position: { lat: latitude, lng: longitude },
              key: Date.now()
            },
            mapCenter: { lat: latitude, lng: longitude },
            lat: latitude,
            lng: longitude,
            address: response.data.results[0].formatted_address
          })
        })
        .catch((error) => {
          alert("Oooppss!", "Ada yang error!", "error");
        });
    });
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    setOpenBackdrop(true)
    const data = {
      "nama": state.nama,
      "no_hp": state.nomorHandphone,
      "ttl": state.tanggalLahir,
      "jk": state.jenisKelamin,
      "kode": state.kode,
      "status": state.status,
      "rumah_sakit_id": parseInt(loginReducer.userData.jti),
      "admin_id": parseInt(loginReducer.userData.name),
      "email": state.email,
      "longitude": String(state.lat),
      "latitude": String(state.lng)
    }
    axios
      .post(`https://api.warung999.com/pasien`, data, { headers: {
          Authorization: `Bearer ${loginReducer.token}`
        }
      })
      .then(() => {
        setOpenBackdrop(false)
        setOpenSnackbar({...openSnackbar, open: true, severity: "success", message: "Berhasil input data"})
        history.replace("/thank-you")
      })
      .catch(() => {
        setOpenBackdrop(false)
        setOpenSnackbar({...openSnackbar, open: true, severity: "error", message: "Terjadi Kesalahan"})
        // history.replace("/thank-you")
      })
  }

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Menu />
      <div className={classes.paper}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography component="h1" variant="h5">
          Input Pasien
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nama"
            label="Nama"
            name="nama"
            autoComplete="Nama"
            autoFocus
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="nomorHandphone"
            label="Nomor Handphone"
            id="nomorHandphone"
            autoComplete="nomorHandphone"
            onChange={(e) => handleChange(e)}
          />
          <TextField
            variant="outlined"
            name='tanggalLahir'
            id="date"
            label="Tanggal Lahir"
            type="date"
            defaultValue={state.tanggalLahir}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={(e) => handleChange(e)}
            style={{marginTop: '10px'}}
          />
          <FormLabel component="legend" style={{marginTop: '15px'}}>Jenin Kelamin</FormLabel>
          <RadioGroup aria-label="gender" name="jenisKelamin" value={state.jenisKelamin} onChange={handleChange}>
            <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
            <FormControlLabel value="laki-laki" control={<Radio />} label="Laki-laki" />
          </RadioGroup>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="kode"
              label="Kode"
              name="kode"
              autoComplete="kode"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleChange(e)}
            />
          <FormControl variant="outlined" className={classes.formControl} style={{width: "100%", marginTop: '10px'}}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
              required
              name="status"
              value={state.status}
              onChange={(e) => handleChange(e)}
              label="Status"
            >
              <option aria-label="None" value="" />
              <option value={'pdp'}>PDP</option>
              <option value={'odp'}>ODP</option>
              <option value={'positif'}>Positif</option>
              <option value={'otg'}>OTG</option>
            </Select>
          </FormControl>
          <h3 style={{marginBottom:'0'}}>ID Rumah Sakit: {loginReducer.userData.jti}</h3>
          {/* <FormControl variant="outlined" className={classes.formControl} style={{width: "100%", marginTop: '10px'}}>
            <InputLabel htmlFor="outlined-age-native-simple">ID Rumah Sakit</InputLabel>
            <Select
              native
              required
              value={state.rumahSakitId}
              label="ID Rumah Sakit"
              // inputProps={{
              //   name: 'age',
              //   id: 'outlined-age-native-simple',
              // }}
            >
              <option aria-label="None" value="" />
              <option value={'1'}>1</option>
              <option value={'2'}>2</option>
              <option value={'3'}>3</option>
              <option value={'4'}>4</option>
            </Select>
          </FormControl> */}
          <h3 style={{marginBottom:'0'}}>Klik peta untuk memilih lokasi karantina pasien</h3>
          <GoogleMaps
            markers={state.markers}
            center={state.mapCenter}
            handleMapLoad={handleMapLoad}
            handleMapClick={handleMapClick}
          />
          <div>
            <p>Latitude: {state.lat}</p>
            <p>Longitude: {state.lng}</p>
            <p>Address: {state.address}</p>
          </div>
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
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}