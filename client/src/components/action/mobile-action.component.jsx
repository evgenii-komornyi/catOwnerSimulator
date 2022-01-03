import * as React from 'react';
import { MenuItem } from '@mui/material';

import { setSound } from '../../redux/reducers/sound.reducer';

import { useDispatch } from 'react-redux';

const MobileAction = ({
    children,
    dispatches,
    isDisabled,
    sound,
    handleClose,
}) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatches.map((click) => dispatch(click));
        handleClose();
        sound && dispatch(setSound(sound));
    };

    return (
        <MenuItem onClick={onClickHandler} disabled={isDisabled} disableRipple>
            {children}
        </MenuItem>
    );
};

export default MobileAction;
