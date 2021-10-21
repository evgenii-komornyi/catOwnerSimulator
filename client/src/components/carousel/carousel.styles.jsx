import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    carousel: {
        padding: '5px',

        '& .owl-item.active.center img': {
            border: '10px solid white',
        },
    },
});
