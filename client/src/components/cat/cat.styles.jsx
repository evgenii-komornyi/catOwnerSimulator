import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    catAvatar: {
        marginTop: -15,
    },
    healthIcon: {
        width: 20,
    },
    foodIcon: {
        width: 20,
    },
    moodIcon: {
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
});
