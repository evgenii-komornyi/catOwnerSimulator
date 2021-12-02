import * as React from 'react';
import { useSelector } from 'react-redux';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
} from '@mui/material';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';

import WhatNew from '../whatNew/whatNew.component';
import Help from '../help/help.component';

import HappyCatCoins from '../../icons/owner/happycatcoins_w2.png';
import SoundSettings from './sound-settings.component';

const Header = ({ startGame, stopGame }) => {
    const { intervalId } = useSelector((state) => state.interval);
    const { happyCatCoins } = useSelector((state) => state.owner);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {intervalId !== 0 && (
                        <>
                            <Tooltip title="HappyCatCoins" placement="bottom">
                                <IconButton size="large">
                                    <img
                                        src={HappyCatCoins}
                                        alt=""
                                        width="70%"
                                    />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6" sx={{ ml: 1 }}>
                                {happyCatCoins.toFixed(2)}
                            </Typography>
                        </>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
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
                        <SoundSettings />
                        <Help />
                        <WhatNew />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
