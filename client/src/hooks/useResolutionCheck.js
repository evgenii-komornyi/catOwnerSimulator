import { useMediaQuery } from '@mui/material';

const useResolutionCheck = () => {
    const isMobile = useMediaQuery('(pointer: coarse)');
    const isLandscape = useMediaQuery('(orientation: landscape)');
    const isWidthLess = useMediaQuery('(max-width: 359px)');
    const isWidthMore = useMediaQuery('(min-width: 1279px)');

    return [isMobile, isLandscape, isWidthLess, isWidthMore];
};

export default useResolutionCheck;
