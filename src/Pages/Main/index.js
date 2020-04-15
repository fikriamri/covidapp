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

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(50),
        height: theme.spacing(100),
      },
    margin: {
        margin: theme.spacing(3),
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
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
            <Paper style={{ padding: 10}}>
            <Grid
          container
          spacing={0}
          direction="column"
          justify="flex-start"
        >
            <div className={classes.margin}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Bagaimana Kondisi anda sekarang? </FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="female" control={<Radio />} label="Sangat Sehat" />
                    <FormControlLabel value="male" control={<Radio />} label="Kurang Sehat" />
                    <FormControlLabel value="other" control={<Radio />} label="Sakit" />
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