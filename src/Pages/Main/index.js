import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(100),
      },
    },
    margin: {
        margin: theme.spacing(2),
      },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2)
    },
    textField: {
      '& > *': {
        margin: theme.spacing(1),
        width: '10ch',
      },
    },
  }));

export default function SimpleContainer() {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <div className={classes.root}>
            <Paper className={classes.paper}>
            <Grid
          container
          spacing={0}
          direction="column"
          alignContent="center"
        >
            <div className={classes.margin}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Bagaimana Kondisi anda sekarang? </FormLabel>
                <RadioGroup aria-label="condition" name="condition" value={value} onChange={handleChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Sangat Sehat" />
                    <FormControlLabel value="male" control={<Radio />} label="Kurang Sehat" />
                    <FormControlLabel value="other" control={<Radio />} label="Sakit" />
                </RadioGroup>
            </FormControl>
            </div>
            <div className={classes.margin}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Berapa suhu tubuh anda sekarang? </FormLabel>
              <form className={classes.textField} noValidate autoComplete="off">
                <TextField id="filled-basic" variant="filled" />
              </form>
              <Typography>derajat celsius</Typography>
            </FormControl>
            </div>
            <div className={classes.margin}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Apakah anda sedang sakit demam? </FormLabel>
                <RadioGroup aria-label="demam" name="demam" value={value} onChange={handleChange}>
                    <FormControlLabel value="ya" control={<Radio />} label="Ya" />
                    <FormControlLabel value="tidak" control={<Radio />} label="Tidak" />
                </RadioGroup>
            </FormControl>
            </div>
        </Grid>
            </Paper>
        </div>
      </Container>
    </React.Fragment>
  );
}