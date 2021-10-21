import React, { forwardRef, memo } from 'react';
import OwlCarousel from 'react-owl-carousel';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
} from '@mui/material';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.green.css';

import cats from './cats.json';
import { useStyles } from './carousel.styles';

const Carousel = memo(
    forwardRef(({ clickHandler }, ref) => {
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

        return (
            <OwlCarousel
                responsive={responsive}
                ref={ref}
                className={`${classes.carousel} owl-theme`}
            >
                {cats.map((cat, key) => (
                    <Card
                        variant="elevation"
                        className="item"
                        sx={{ width: '250px', mr: 'auto', ml: 'auto' }}
                        key={key}
                        data-img={cat.img}
                        onClick={(e) => {
                            clickHandler(e, key);
                        }}
                    >
                        <CardContent>
                            <img
                                style={{ width: '100%' }}
                                src={`https://komornyi.space/static/img/cat_project/img/cats/${cat.img}.png`}
                                data-img={cat.img}
                                alt={cat.color}
                            />
                        </CardContent>
                    </Card>
                ))}
            </OwlCarousel>
        );
    })
);

export default Carousel;
