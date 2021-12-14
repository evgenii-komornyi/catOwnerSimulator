import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        startGame: {
            cursor: 'pointer',
            '&:hover': {
                filter: 'sepia(100%)',
            },

            [theme.breakpoints.down('sm')]: {
                width: '60%',
            },
        },
    };
});
