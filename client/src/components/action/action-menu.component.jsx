import React, { useEffect, useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import { Menu, Button, IconButton, Badge } from '@mui/material';
import {
    KeyboardArrowDown,
    NotificationsActiveTwoTone,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useAnchorEl } from '../../hooks/useAnchorEl';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light'
                ? 'rgb(55, 65, 81)'
                : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const ActionMenu = ({ children, title, margin }) => {
    const { flat, toilets } = useSelector((state) => state.owner);

    const [anchorEl, open, handleClick, handleClose] = useAnchorEl();

    const [isInvisible, setIsInvisible] = useState(true);

    useEffect(() => {
        const hasToiletShit = toilets.every((toilet) => toilet.slots < 4);

        hasToiletShit || flat.impurity !== 0 || flat.smell !== 0
            ? setIsInvisible(false)
            : setIsInvisible(true);
    }, [isInvisible, flat.impurity, flat.smell, toilets]);

    return (
        <>
            {title === 'Flat' ? (
                <IconButton
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDown />}
                    sx={margin}
                >
                    <Badge
                        variant="dot"
                        showZero
                        color="secondary"
                        invisible={isInvisible}
                    >
                        <NotificationsActiveTwoTone />
                    </Badge>
                </IconButton>
            ) : (
                <Button
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="outlined"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDown />}
                    sx={margin}
                >
                    {title} actions
                </Button>
            )}
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {children}
            </StyledMenu>
        </>
    );
};

export default ActionMenu;
