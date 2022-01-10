import React from 'react';
import { useSelector } from 'react-redux';

import { Container, Typography } from '@mui/material';
import Owner from '../components/owner/owner.component';
import Menu from '../components/menu/menu.component';
import { useStyles } from './main-page.styles';
import useResolutionCheck from '../hooks/useResolutionCheck';

const MainPage = ({ startGame }) => {
    const [isMobile, isLandscape, isWidthLess, isWidthMore] =
        useResolutionCheck();

    const classes = useStyles();

    const { intervalId } = useSelector((state) => state.interval);

    return (isMobile && isLandscape && !isWidthMore) || isWidthLess ? (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h3">
                This app does not support this device
            </Typography>
        </Container>
    ) : (
        <Container maxWidth="lg" className={classes.container}>
            {intervalId !== 0 ? <Owner /> : <Menu startGame={startGame} />}
        </Container>
    );
};

export default MainPage;
