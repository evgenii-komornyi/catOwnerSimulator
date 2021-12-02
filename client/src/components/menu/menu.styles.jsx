import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    startGame: {
        cursor: 'pointer',
        '&:hover': {
            filter: 'sepia(100%)',
        },
    },
});
