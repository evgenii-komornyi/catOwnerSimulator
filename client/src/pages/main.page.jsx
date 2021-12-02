import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';
import Owner from '../components/owner/owner.component';
import Menu from '../components/menu/menu.component';

const MainPage = ({ startGame }) => {
    const { intervalId } = useSelector((state) => state.interval);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {intervalId !== 0 ? <Owner /> : <Menu startGame={startGame} />}
        </Container>
    );
};

export default MainPage;
