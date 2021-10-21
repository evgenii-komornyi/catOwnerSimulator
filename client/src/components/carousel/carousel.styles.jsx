import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    carousel: {
        padding: '5px',

        '& .owl-item.active.center': {
            border: '5px solid white',
        },
    },
});
