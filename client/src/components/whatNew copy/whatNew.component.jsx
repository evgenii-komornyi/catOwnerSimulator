import React, { useState, useRef } from 'react';
import {
    Button,
    IconButton,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { Announcement } from '@mui/icons-material';

import data from './news.json';

const WhatNew = () => {
    const [open, setOpen] = useState(false);
    const [scroll] = useState('body');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div>
            <IconButton size="large" onClick={handleClickOpen} color="inherit">
                <Announcement />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">What is new?</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {sortedData.map((n, i) => (
                            <div key={i}>
                                <Typography variant="caption">
                                    {' '}
                                    {n.date}{' '}
                                </Typography>
                                <Typography paragraph>{n.news}</Typography>
                            </div>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default WhatNew;
