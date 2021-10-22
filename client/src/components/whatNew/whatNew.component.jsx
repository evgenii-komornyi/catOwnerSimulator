import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import data from './news.json';
import { Typography } from '@mui/material';

export default function WhatNew() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('body');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
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
            <Button
                variant="outlined"
                sx={{ position: 'absolute', bottom: 10, right: 10 }}
                onClick={handleClickOpen}
            >
                What is new?
            </Button>
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
}
