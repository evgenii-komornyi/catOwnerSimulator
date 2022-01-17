import React, { useState, useRef } from 'react';
import useResolutionCheck from '../../hooks/useResolutionCheck';

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
import HelpIcon from '@mui/icons-material/Help';

import HelpPC from './help-pc.png';
import HelpMob from './help-mob.png';

const Help = () => {
    const [open, setOpen] = useState(false);
    const [scroll] = useState('body');

    const [isMobile] = useResolutionCheck();

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

    return (
        <>
            <IconButton size="large" onClick={handleClickOpen} color="inherit">
                <HelpIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                fullWidth
                maxWidth={`${isMobile ? 'xs' : 'md'}`}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">How to play?</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <img
                            src={isMobile ? HelpMob : HelpPC}
                            alt="help"
                            width="100%"
                        />
                        {isMobile ? (
                            <>
                                <Typography paragraph variant="body">
                                    A. Menu (start / stop game, sound settings,
                                    help)
                                </Typography>
                                <Typography paragraph variant="body">
                                    B. Owner actions (clean toilet, clean flat,
                                    open / close window. When you need to do
                                    action, this bell will have a dot)
                                </Typography>
                                <Typography paragraph variant="body">
                                    C. HappyCatCoins (increase if cats' mood
                                    level more than 0)
                                </Typography>
                                <Typography paragraph variant="body">
                                    D. Add a cat (max: 4)
                                </Typography>
                                <Typography paragraph variant="body">
                                    E. Cat actions (Feed cat (increase food
                                    level to maximum. Pet cat (increase mood
                                    level to maximum))
                                </Typography>
                                <Typography paragraph variant="body">
                                    F. Owner's flat
                                </Typography>
                                <Typography paragraph variant="body">
                                    G. Cats' toilet
                                </Typography>
                            </>
                        ) : (
                            <>
                                <Typography paragraph variant="body">
                                    A. Start / Stop a game
                                </Typography>
                                <Typography paragraph variant="body">
                                    B. Sound settings
                                </Typography>
                                <Typography paragraph variant="body">
                                    C. Add a cat (max: 4)
                                </Typography>
                                <Typography paragraph variant="body">
                                    D. HappyCatCoins (increase if cats' mood
                                    level (O) more than 0)
                                </Typography>
                                <Typography paragraph variant="body">
                                    E. Feed cat (increase food level (N) to
                                    maximum)
                                </Typography>
                                <Typography paragraph variant="body">
                                    F. Pet cat (increase mood level (O) to
                                    maximum)
                                </Typography>
                                <Typography paragraph variant="body">
                                    G. Clean toilet
                                </Typography>
                                <Typography paragraph variant="body">
                                    H. Clean carpet from cats' poo
                                </Typography>
                                <Typography paragraph variant="body">
                                    J. Open / Close window (decrease smell level
                                    from a flat (K))
                                </Typography>
                                <Typography paragraph variant="body">
                                    K. Owner's flat
                                </Typography>
                                <Typography paragraph variant="body">
                                    L. Cats' toilet
                                </Typography>
                                <Typography paragraph variant="body">
                                    M. Cat health level (if cat has less than
                                    max, after feeding it will up. If health
                                    level will be equal 0, then cat die)
                                </Typography>
                                <Typography paragraph variant="body">
                                    N. Cat food level (if food level will be
                                    equal 0, then cat's health start decrease
                                    and you cannot be able to pet cat)
                                </Typography>
                                <Typography paragraph variant="body">
                                    O. Cat mood level (if mood level will be
                                    equal 0, then HappyCatCoins (D) will not be
                                    increasing)
                                </Typography>
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Help;
