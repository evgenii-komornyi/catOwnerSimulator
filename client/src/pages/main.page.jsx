import React from 'react';
import { Container } from '@mui/material';
import Form from '../components/form/form.component';
import Cat from '../components/cat/cat.component';

const MainPage = ({
    catName,
    setCatName,
    tick,
    healthLevel,
    currentFood,
    currentHealth,
    feed,
}) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            {!catName ? (
                <Form setCatName={setCatName} tick={tick} />
            ) : (
                <Cat
                    catName={catName}
                    healthLevel={healthLevel}
                    currentFood={currentFood}
                    currentHealth={currentHealth}
                    feed={feed}
                />
            )}
        </Container>
    );
};

export default MainPage;
