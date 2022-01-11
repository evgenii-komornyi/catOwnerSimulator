import React, { forwardRef, memo } from 'react';

import OwlCarousel from 'react-owl-carousel';
import { Card, CardContent } from '@mui/material';

import Buttons from './buttons.component';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.green.css';

import { useStyles } from './carousel.styles';

const Carousel = memo(
    forwardRef(({ goToSlide, setCat, slides, category }, ref) => {
        const classes = useStyles();

        const responsive = {
            0: {
                dots: false,
                nav: false,
                loop: false,
                autoplay: false,
                margin: 0,
                center: true,
                items: 1,
            },
            1000: {
                dots: false,
                nav: false,
                loop: false,
                autoplay: false,
                margin: 0,
                center: true,
                items: 3,
            },
        };

        const events = {
            onDragged: function (event) {
                goToSlide(event, event.item.index, null);
            },
        };

        return (
            <>
                <OwlCarousel
                    responsive={responsive}
                    ref={ref}
                    className={`${classes.carousel} owl-theme`}
                    {...events}
                >
                    {slides.map((slide, index) => (
                        <Card
                            variant="elevation"
                            className={`item ${classes.itemCard}`}
                            key={index}
                            data-index={index}
                            data-img={slide.img}
                            onClick={(e) => {
                                goToSlide(null, index, e);
                            }}
                        >
                            <CardContent>
                                <img
                                    src={`${process.env.REACT_APP_HOST_IMG_URL}/${category}/${slide.img}.png`}
                                    data-img={slide.img}
                                    className={classes.carouselImg}
                                    alt={slide.color}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </OwlCarousel>
                <Buttons
                    carouselRef={ref}
                    setCat={setCat}
                    lastItem={slides.length - 1}
                />
            </>
        );
    })
);

export default Carousel;
