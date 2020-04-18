import React from 'react';
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
}));

export default function InputPasien() {
  const [nama, setNama] = React.useState('');

  const handleNamaChange = (event) => {
    setNama(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
  }

  const [nomorHandphone, setNomorHandphone] = React.useState('');

  const handleNomorHandphoneChange = (event) => {
    setNomorHandphone(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
  }

  const [tanggalLahir, setTanggalLahir] = React.useState('2020-04-04');

  const handleTanggalLahirChange = (event) => {
    setTanggalLahir(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
  };

  const [jenisKelamin, setJenisKelamin] = React.useState('perempuan');

  const handleJenisKelaminChange = (event) => {
    setJenisKelamin(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
  };

  const [kode, setKode] = React.useState('');

  const handleKodeChange = (event) => {
    setKode(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
  }

  const [status, setStatus] = React.useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
  };

  const [rumahSakitId, setRumahSakitId] = React.useState('');

  const handleRumahSakitIdChange = (event) => {
    setRumahSakitId(event.target.value);
    console.log({
      nama,
      nomorHandphone,
      tanggalLahir,
      jenisKelamin,
      kode,
      status,
      rumahSakitId
    });
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
            onChange={handleNamaChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="no_hp"
            label="Nomor Handphone"
            id="no_hp"
            autoComplete="no_hp"
            onChange={handleNomorHandphoneChange}
          />
          <TextField
            variant="outlined"
            id="date"
            label="Tanggal Lahir"
            type="date"
            defaultValue={tanggalLahir}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleTanggalLahirChange}
            style={{marginTop: '10px'}}
          />
          <FormLabel component="legend" style={{marginTop: '15px'}}>Jenin Kelamin</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={jenisKelamin} onChange={handleJenisKelaminChange}>
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
              onChange={handleKodeChange}
            />
          <FormControl variant="outlined" className={classes.formControl} style={{width: "100%", marginTop: '10px'}}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
              required
              value={status}
              onChange={handleStatusChange}
              label="Status"
              // inputProps={{
              //   name: 'age',
              //   id: 'outlined-age-native-simple',
              // }}
            >
              <option aria-label="None" value="" />
              <option value={'pdp'}>PDP</option>
              <option value={'odp'}>ODP</option>
              <option value={'positif'}>Positif</option>
              <option value={'otg'}>OTG</option>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl} style={{width: "100%", marginTop: '10px'}}>
            <InputLabel htmlFor="outlined-age-native-simple">ID Rumah Sakit</InputLabel>
            <Select
              native
              required
              value={rumahSakitId}
              onChange={handleRumahSakitIdChange}
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
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}