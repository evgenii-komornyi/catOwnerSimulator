import { makeStyles } from '@mui/styles';
import { useTheme } from '@emotion/react';

export const useStyles = makeStyles(() => {
    const theme = useTheme();

    return {
        container: {
            marginTop: 40,

            [theme.breakpoints.down('sm')]: {
                marginTop: -10,
            },
        },
    };
});
