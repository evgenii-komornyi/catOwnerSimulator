import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        catCard: {
            height: 315,
            padding: 0,

            [theme.breakpoints.down('sm')]: {
                height: 'auto',
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
