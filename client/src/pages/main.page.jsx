import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@mui/material';
import Form from '../components/form/form.component';
import Cat from '../components/cat/cat.component';

const MainPage = ({
    tick,
    currentFood,
    currentHealth,
    currentMood,
    feed,
    petCat,
}) => {
    const { name } = useSelector((state) => state.cat.cat);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {!name ? (
                <Form tick={tick} />
            ) : (
                <Cat
                    currentFood={currentFood}
                    currentHealth={currentHealth}
                    currentMood={currentMood}
                    feed={feed}
                    petCat={petCat}
                />
            )}
        </Container>
    );
};

export default MainPage;
