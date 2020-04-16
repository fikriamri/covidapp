import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from '@material-ui/core/FormLabel';

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

export default function SignIn() {
  const [selectedDate, setSelectedDate] = React.useState('2020-04-04');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log(typeof event.target.value)
    console.log(selectedDate)
  };

  const [value, setValue] = React.useState('wanita');
  console.log(value);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  const [status, setStatus] = React.useState('');

  const handleStatusChange = (event) => {
    setStatus(event.target.value)
  };
  const classes = useStyles();

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
          />
          <TextField
            variant="outlined"
            id="date"
            label="Tanggal Lahir"
            type="date"
            defaultValue={selectedDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            onChange={handleDateChange}
            style={{marginTop: '10px'}}
          />
          <FormLabel component="legend" style={{marginTop: '15px'}}>Jenin Kelamin</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
            <FormControlLabel value="wanita" control={<Radio />} label="Wanita" />
            <FormControlLabel value="pria" control={<Radio />} label="Pria" />
          </RadioGroup>
          <FormControl variant="outlined" className={classes.formControl} style={{width: "100%", marginTop: '10px'}}>
            <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
            <Select
              native
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