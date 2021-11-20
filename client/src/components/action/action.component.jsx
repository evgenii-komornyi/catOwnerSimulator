import React from 'react';
import { Card, CardContent, IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';

const Action = ({ children, dispatches, isDisabled, title }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatches.map((click) => dispatch(click));
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
