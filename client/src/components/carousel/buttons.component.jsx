import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveIndex } from '../../redux/reducers/activeIndex.reducer';

const Buttons = ({ carouselRef, setCat, lastCat }) => {
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

        if (index < lastCat) {
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
                sx={{
                    position: 'relative',
                    top: '-160px',
                    right: '500px',
                    zIndex: 9999,
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
                sx={{
                    position: 'relative',
                    top: '-160px',
                    left: '500px',
                    zIndex: 9999,
                    visibility: `${
                        activeIndex === lastCat ? 'hidden' : 'visible'
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
