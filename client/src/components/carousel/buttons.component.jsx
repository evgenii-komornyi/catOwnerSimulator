import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveIndex } from '../../redux/reducers/activeIndex.reducer';

import { useStyles } from './carousel.styles';

const Buttons = ({ carouselRef, setCat, lastItem }) => {
    const classes = useStyles();

    const { activeIndex } = useSelector((state) => state.activeIndex);

    const dispatch = useDispatch();

    const goToPreviousSlide = () => {
        carouselRef.current.prev();

        const items = [
            ...carouselRef.current.container.children[0].children[0].children,
        ];

        items.forEach((v, _) => {
            if (v.classList.contains('center')) {
                setCat((prevState) => ({
                    ...prevState,
                    img: v.children[0].dataset.img,
                }));
            }
        });

        let index = activeIndex;

        if (index > 0) {
            index--;
            dispatch(setActiveIndex(index));
        }
    };

    const goToNextSlide = () => {
        carouselRef.current.next();

        const items = [
            ...carouselRef.current.container.children[0].children[0].children,
        ];

        items.forEach((v, _) => {
            if (v.classList.contains('center')) {
                setCat((prevState) => ({
                    ...prevState,
                    img: v.children[0].dataset.img,
                }));
            }
        });

        let index = activeIndex;

        if (index < lastItem) {
            index++;
            dispatch(setActiveIndex(index));
        }
    };

    return (
        <>
            <IconButton
                color="success"
                size="large"
                aria-label="prev"
                className={classes.prevBtn}
                style={{
                    visibility: `${activeIndex === 0 ? 'hidden' : 'visible'}`,
                }}
                onClick={() => goToPreviousSlide()}
            >
                <ArrowBack />
            </IconButton>
            <IconButton
                color="success"
                size="large"
                aria-label="next"
                className={classes.nextBtn}
                style={{
                    visibility: `${
                        activeIndex === lastItem ? 'hidden' : 'visible'
                    }`,
                }}
                onClick={() => goToNextSlide()}
            >
                <ArrowForward />
            </IconButton>
        </>
    );
};

export default React.memo(Buttons);
