import * as React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
} from '@mui/material';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

import WhatNew from '../whatNew/whatNew.component';
import Help from '../help/help.component';

import HappyCatCoins from '../../icons/owner/happycatcoins_w2.png';
import SoundSettings from './sound-settings.component';

const Header = ({ startGame, stopGame }) => {
    const matches = useMediaQuery('(min-width: 769px)');

    const { intervalId } = useSelector((state) => state.interval);
    const { happyCatCoins } = useSelector((state) => state.owner);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    {matches ? (
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
                    ) : (
                        <>
                            <IconButton
                                size="large"
                                color="inherit"
                                aria-controls="basic-menu"
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem>
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
                                </MenuItem>
                                <MenuItem>
                                    <SoundSettings />
                                </MenuItem>
                                <MenuItem>
                                    <Help />
                                </MenuItem>
                                <MenuItem>
                                    <WhatNew />
                                </MenuItem>
                            </Menu>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
