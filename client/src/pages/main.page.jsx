import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';
import Owner from '../components/owner/owner.component';

const MainPage = ({ tick }) => {
    const { intervalId } = useSelector((state) => state.interval);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {intervalId !== 0 && <Owner />}
        </Container>
    );
};

export default MainPage;
