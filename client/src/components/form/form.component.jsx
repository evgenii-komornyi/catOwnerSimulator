import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCat } from '../../redux/reducers/cat.reducer';
import { setToilet } from '../../redux/reducers/toilet.reducer';

import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Typography,
} from '@mui/material';

import { generateID } from '../../helpers/idGenerator.helper';
import Carousel from '../carousel/carousel.component';

const Form = ({ tick }) => {
    const [cat, setCat] = useState({ id: '', name: '', img: 'black' });
    const dispatch = useDispatch();

    const carouselRef = useRef(null);

    const handleChange = useCallback((e) => {
        const { value } = e.target;

        setCat((prevCat) => ({ ...prevCat, name: value }));
    }, []);

    const changeCatOnClick = useCallback((e, key) => {
        carouselRef.current.to(key, 300);

        setCat((prevCat) => ({ ...prevCat, img: e.target.dataset.img }));
    }, []);

    const startGameHandler = () => {
        if (cat.name === '') {
            alert('Name cannot be empty');
        } else {
            dispatch(createCat({ ...cat, id: generateID() }));
            dispatch(setToilet({ id: generateID() }));
            tick();
        }
    };

    return (
        <Grid container>
            <Grid item lg={12} sx={{ textAlign: 'center' }}>
                <Card variant="outlined" sx={{ mr: 'auto', ml: 'auto' }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Choose your cat
                        </Typography>
                        <Grid container>
                            <Grid item lg={12}>
                                <TextField
                                    label="Cat name"
                                    value={cat.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={12} sx={{ mt: 2 }}>
                                <Carousel
                                    clickHandler={changeCatOnClick}
                                    ref={carouselRef}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            sx={{ mr: 'auto', ml: 'auto' }}
                            onClick={startGameHandler}
                        >
                            adopt
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Form;
