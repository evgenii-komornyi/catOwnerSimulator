import React, { useCallback, useRef } from 'react';

import { Grid, TextField } from '@mui/material';

import Carousel from '../carousel/carousel.component';
import { useDispatch } from 'react-redux';
import { setActiveIndex } from '../../redux/reducers/activeIndex.reducer';

import cats from '../../data/cats.json';

const Form = ({ cat, setCat, handleChange }) => {
    const carouselRef = useRef(null);

    const dispatch = useDispatch();

    const changeCatOnClick = useCallback(
        (e, index, clickedTarget) => {
            carouselRef.current.to(index, 300);
            if (e !== null) {
                const items = [
                    ...e.currentTarget.children[0].children[0].children,
                ];

                items.forEach((v, _) => {
                    if (v.classList.contains('center')) {
                        setCat((prevState) => ({
                            ...prevState,
                            img: v.children[0].dataset.img,
                        }));
                    }
                });
            }
            if (clickedTarget !== null) {
                setCat((prevState) => ({
                    ...prevState,
                    img: clickedTarget.target.dataset.img,
                }));
            }
            dispatch(setActiveIndex(index));
        },
        [dispatch, setCat]
    );

    return (
        <Grid container>
            <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ textAlign: 'center' }}
            >
                <TextField
                    label="Cat name"
                    value={cat.name}
                    name="name"
                    onChange={handleChange}
                />
                <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={{ mt: 2 }}
                >
                    <Carousel
                        goToSlide={changeCatOnClick}
                        ref={carouselRef}
                        setCat={setCat}
                        slides={cats}
                        category="cats"
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;
