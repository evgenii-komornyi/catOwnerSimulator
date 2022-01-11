import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        prevBtn: {
            position: 'relative',
            top: '-160px',
            right: '500px',
            zIndex: 9999,

            [theme.breakpoints.between(0, 960)]: {
                right: 0,
                top: 0,
            },
        },
        nextBtn: {
            position: 'relative',
            top: '-160px',
            left: '500px',
            zIndex: 9999,

            [theme.breakpoints.between(0, 960)]: {
                left: 0,
                top: 0,
            },
        },
        carousel: {
            padding: '5px',

            '& .owl-item.active.center img': {
                border: '10px solid white',
            },
        },
        itemCard: {
            width: '250px',
            marginRight: 'auto',
            marginLeft: 'auto',
        },

        carouselImg: {
            width: '100%',
        },
    };
});
