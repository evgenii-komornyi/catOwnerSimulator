import React from 'react';

import { Grid, LinearProgress } from '@mui/material';
import { useStyles } from './cat.styles';

import { checkLevel } from '../../helpers/levelChecker';

const Level = ({ currentValue, maxValue, level }) => {
    const classes = useStyles();

    return (
        <>
            <Grid item xl={2} lg={2} sx={{ textAlign: 'right', mt: -1 }}>
                <img
                    src={checkLevel(currentValue, level)}
                    alt=""
                    className={classes.icon}
                />
            </Grid>
            <Grid
                item
                xl={10}
                lg={10}
                sx={{
                    textAlign: 'center',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={Math.ceil((currentValue * 100) / maxValue)}
                    color={`${
                        currentValue < Math.round(maxValue * 0.3)
                            ? 'error'
                            : 'primary'
                    }`}
                    className={classes.progressBar}
                />
            </Grid>
        </>
    );
};

export default Level;
