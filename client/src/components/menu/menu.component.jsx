import React from 'react';
import { Grid } from '@mui/material';

import StartButton from '../../icons/logo_start.png';
import { useStyles } from './menu.styles';

const Menu = ({ startGame }) => {
    const classes = useStyles();

    return (
        <Grid container sx={{ textAlign: 'center' }}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <img
                    src={StartButton}
                    className={classes.startGame}
                    alt="start"
                    onClick={startGame}
                />
            </Grid>
        </Grid>
    );
};

export default Menu;
