import React, { forwardRef, memo } from 'react';

import OwlCarousel from 'react-owl-carousel';
import { Card, CardContent } from '@mui/material';

import Buttons from './buttons.component';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.green.css';

import cats from './cats.json';
import { useStyles } from './carousel.styles';

const Carousel = memo(
    forwardRef(({ goToSlide, setCat }, ref) => {
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
            600: {
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
                    {cats.map((cat, index) => (
                        <Card
                            variant="elevation"
                            className="item"
                            sx={{ width: '250px', mr: 'auto', ml: 'auto' }}
                            key={index}
                            data-index={index}
                            data-img={cat.img}
                            onClick={(e) => {
                                goToSlide(null, index, e);
                            }}
                        >
                            <CardContent>
                                <img
                                    style={{ width: '100%' }}
                                    src={`${process.env.REACT_APP_HOST_IMG_URL}/cats/${cat.img}.png`}
                                    data-img={cat.img}
                                    alt={cat.color}
                                />
                            </CardContent>
                        </Card>
                    ))}
                </OwlCarousel>
                <Buttons
                    carouselRef={ref}
                    setCat={setCat}
                    lastCat={cats.length - 1}
                />
            </>
        );
    })
);

export default Carousel;
