import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';

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
          alignItems="center"
          justify="center"
        >
            <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" style={{ marginTop: 10}}>
                        <Grid item >
                            <AccountCircle />
                        </Grid>
                        <Grid item >
                            <TextField fullWidth id="input-with-icon-grid" label="Nama" />
                        </Grid>
                </Grid>
                <Grid container spacing={1} alignItems="flex-end" style={{ marginTop: 10}}>
                        <Grid item >
                            <PhoneIcon />
                        </Grid>
                        <Grid item >
                            <TextField fullWidth id="input-with-icon-grid" label="Nomor Telepon" />
                        </Grid>
                </Grid>
            </div>
        </Grid>
            </Paper>
        </div>
      </Container>
    </React.Fragment>
  );
}