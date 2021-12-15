import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';
import Owner from '../components/owner/owner.component';
import Menu from '../components/menu/menu.component';
import { useStyles } from './main-page.styles';

const MainPage = ({ startGame }) => {
    const classes = useStyles();

    const { intervalId } = useSelector((state) => state.interval);

    return (
        <Container maxWidth="lg" className={classes.container}>
            {intervalId !== 0 ? <Owner /> : <Menu startGame={startGame} />}
        </Container>
    );
};

export default MainPage;
