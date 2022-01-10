import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        catCard: {
            height: 315,
            padding: 0,

            [theme.breakpoints.down('sm')]: {
                height: 170,
            },

            [theme.breakpoints.between(360, 376)]: {
                height: 170,
            },

            [theme.breakpoints.between(377, 401)]: {
                height: 180,
            },

            [theme.breakpoints.between(402, 421)]: {
                height: 200,
            },

            [theme.breakpoints.between(422, 603)]: {
                height: 200,
            },
        },
        catName: {
            [theme.breakpoints.down('sm')]: {
                fontSize: 15,
            },
        },
        catAvatar: {
            marginTop: -15,
        },
        icon: {
            width: 20,
        },
        progressBar: {},
        actions: {
            position: 'relative',
            zIndex: 9999,
            top: -325,
            height: 210,
            backgroundColor: 'rgba(0,0,0,.5)',
            display: (props) => `${props ? 'inline-flex' : 'none'}`,
        },
        disabledAction: {
            filter: 'grayscale(100%)',
        },
    };
});
