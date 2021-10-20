import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';
import Form from '../components/form/form.component';
import Cat from '../components/cat/cat.component';

const MainPage = ({ tick, feed, petCat }) => {
    const { name } = useSelector((state) => state.cat);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {!name ? <Form tick={tick} /> : <Cat feed={feed} petCat={petCat} />}
        </Container>
    );
};

export default MainPage;
