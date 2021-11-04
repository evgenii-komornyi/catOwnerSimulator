import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsSound } from '../../redux/reducers/sound.reducer';

import { AppBar, Box, Toolbar, IconButton, Typography } from '@mui/material';
import {
    PlayCircleRounded,
    StopCircleRounded,
    VolumeOff,
    VolumeUp,
} from '@mui/icons-material';

import WhatNew from '../whatNew/whatNew.component';
import Help from '../help/help.component';

import HappyCatCoins from '../../icons/owner/happycatcoins_w2.png';

const Header = ({ startGame, stopGame }) => {
    const { intervalId } = useSelector((state) => state.interval);
    const { isSound } = useSelector((state) => state.sound);
    const { happyCatCoins } = useSelector((state) => state.owner);

    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {intervalId !== 0 && (
                        <>
                            <IconButton size="large">
                                <img src={HappyCatCoins} alt="" width="70%" />
                            </IconButton>
                            <Typography variant="h6" sx={{ ml: 1 }}>
                                {happyCatCoins}
                            </Typography>
                        </>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={
                                intervalId === 0
                                    ? () => startGame()
                                    : () => stopGame()
                            }
                        >
                            {intervalId === 0 ? (
                                <PlayCircleRounded />
                            ) : (
                                <StopCircleRounded />
                            )}
                        </IconButton>
                        <IconButton
                            size="large"
                            onClick={() => dispatch(setIsSound())}
                            color="inherit"
                        >
                            {isSound ? <VolumeOff /> : <VolumeUp />}
                        </IconButton>
                        <Help />
                        <WhatNew />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
