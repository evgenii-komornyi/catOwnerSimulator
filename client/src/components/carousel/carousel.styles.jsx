import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    carousel: {
        padding: '5px',

        '& .owl-item.active.center img': {
            border: '10px solid white',
        },
        '& .owl-nav button': {
            width: 50,
            height: 50,
            fontSize: '29px !important',
            border: '1px solid #fff !important',
            borderRadius: '50% !important',

            '&.owl-prev': {
                position: 'absolute',
                left: -25,
                top: 100,

                '& span': {
                    position: 'relative',
                    top: -2,
                    left: -1,
                },
            },
            '&.owl-next': {
                position: 'absolute',
                right: -25,
                top: 100,

                '& span': {
                    position: 'relative',
                    top: -2,
                    right: -1,
                },
            },
        },
    },
});
