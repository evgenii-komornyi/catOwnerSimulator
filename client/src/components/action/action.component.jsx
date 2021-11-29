import React from 'react';
import { Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSound } from '../../redux/reducers/sound.reducer';

const Action = ({ children, dispatches, isDisabled, sound, title }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        console.log();
        dispatches.map((click) => dispatch(click));
        sound && dispatch(setSound(sound));
    };

    return (
        <Tooltip title={title} placement="top">
            <Card
                variant="outlined"
                sx={{
                    textAlign: 'center',
                }}
            >
                <CardContent>
                    <IconButton
                        color="success"
                        size="100%"
                        aria-label="feed"
                        disabled={isDisabled}
                        onClick={() => onClickHandler()}
                    >
                        {children}
                    </IconButton>{' '}
                </CardContent>
            </Card>
        </Tooltip>
    );
};

export default Action;
