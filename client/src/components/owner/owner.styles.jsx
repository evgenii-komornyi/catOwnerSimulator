import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        cardAdd: {
            height: 315,

            [theme.breakpoints.down('sm')]: {
                height: 200,
            },
        },
        addBtn: {
            fontSize: 250,
            color: '#333',

            [theme.breakpoints.down('sm')]: {
                fontSize: 130,
            },
        },
        cardCat: {
            [theme.breakpoints.down('sm')]: {
                paddingTop: '2px !important',
            },
        },
    };
});
