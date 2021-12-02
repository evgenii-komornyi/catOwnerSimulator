import React, { useState } from 'react';
import { Tooltip, IconButton, Menu, MenuItem } from '@mui/material';

import { VolumeOff, VolumeUp } from '@mui/icons-material';

import { useSelector } from 'react-redux';
import VolumeSlider from './volume-slider.component';

const SoundSettings = () => {
    const { isSound } = useSelector((state) => state.sound);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    size="large"
                    color="inherit"
                >
                    {isSound ? <VolumeUp /> : <VolumeOff />}
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem>
                    <VolumeSlider />
                </MenuItem>
            </Menu>
        </>
    );
};

export default SoundSettings;
