import React from 'react';

import { Badge, Grid, LinearProgress } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useStyles } from './cat.styles';

import { checkLevel } from '../../helpers/levelChecker';

const Level = ({ currentValue, maxValue, level }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matched = useMediaQuery(theme.breakpoints.up('lg'));

    return matched ? (
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
    ) : (
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Badge
                max={100}
                badgeContent={Math.ceil((currentValue * 100) / maxValue)}
                showZero
            >
                <img
                    src={checkLevel(currentValue, level)}
                    alt=""
                    className={classes.icon}
                />
            </Badge>
        </Grid>
    );
};

export default Level;
