import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Survey() {
    return(
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom display="block">
                    Terima Kasih, Semoga lekas sehat kembali
                </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                <Typography variant="h6" gutterBottom>
                    Kesehatan selalu tampak berharga setelah kita kehilangannya
                </Typography>
            </Grid>
        </Grid>
    )
}