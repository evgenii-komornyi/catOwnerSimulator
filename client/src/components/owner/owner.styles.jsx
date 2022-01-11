import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        cardAdd: {
            height: 315,

            [theme.breakpoints.down('sm')]: {
                width: 50,
                height: 50,
            },

            [theme.breakpoints.between(600, 960)]: {
                width: 100,
                height: 100,
            },
        },
        addBtn: {
            fontSize: 250,
            color: '#333',

            [theme.breakpoints.down('sm')]: {
                fontSize: 20,
            },

            [theme.breakpoints.between(600, 960)]: {
                fontSize: 50,
            },
        },
        cardCat: {
            [theme.breakpoints.down('sm')]: {
                paddingTop: '2px !important',
            },
        },
        smell: {
            position: 'relative',
            width: '99%',
            height: '92%',
            top: -198,
            left: 3,

            [theme.breakpoints.down('sm')]: { top: -115, left: 0 },
        },
    };
});
