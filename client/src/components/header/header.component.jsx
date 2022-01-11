import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { useAnchorEl } from '../../hooks/useAnchorEl';

import {
    cleanToilets,
    cleanRoom,
    airRoom,
} from '../../redux/reducers/owner.reducer';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Tooltip,
    Menu,
    MenuItem,
    Badge,
} from '@mui/material';
import { PlayCircleRounded, StopCircleRounded } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

import WhatNew from '../whatNew/whatNew.component';
import Help from '../help/help.component';

import HappyCatCoins from '../../icons/owner/happycatcoins_w2.png';
import SoundSettings from './sound-settings.component';

import ActionMenu from '../action/action-menu.component';
import MobileAction from '../action/mobile-action.component';

import { useTheme } from '@emotion/react';

const Header = ({ startGame, stopGame }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.between(0, 960));

    const { intervalId } = useSelector((state) => state.interval);
    const { happyCatCoins, flat, toilets } = useSelector(
        (state) => state.owner
    );

    const [anchorEl, open, handleClick, handleClose] = useAnchorEl();

    const hasDot = toilets.every((toilet) => toilet.slots < 4);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position={isMobile ? 'fixed' : 'static'}
                sx={{
                    top: isMobile ? 'auto' : 0,
                    bottom: isMobile ? 0 : 'auto',
                }}
            >
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
                        intervalId !== 0 && (
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
                                <ActionMenu title="Flat" margin={{}}>
                                    <MobileAction
                                        dispatches={[cleanToilets()]}
                                        sound="toilet_cleanup"
                                    >
                                        <Badge
                                            color="primary"
                                            variant={
                                                hasDot ? 'dot' : 'standard'
                                            }
                                            showZero
                                        >
                                            Clean toilets
                                        </Badge>
                                    </MobileAction>
                                    <MobileAction
                                        dispatches={[cleanRoom()]}
                                        sound="flat_cleanup"
                                    >
                                        <Badge
                                            badgeContent={flat.impurity}
                                            color="primary"
                                        >
                                            Clean room
                                        </Badge>
                                    </MobileAction>
                                    <MobileAction
                                        dispatches={[airRoom()]}
                                        sound={
                                            flat.isWindowOpen
                                                ? 'close_window'
                                                : 'open_window'
                                        }
                                    >
                                        <Badge
                                            badgeContent={flat.smell}
                                            color="primary"
                                            max={100}
                                        >
                                            {flat.isWindowOpen
                                                ? 'Close '
                                                : 'Open '}{' '}
                                            window
                                        </Badge>
                                    </MobileAction>
                                </ActionMenu>
                            </>
                        )
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
