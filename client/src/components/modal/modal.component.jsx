import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addCat } from '../../redux/reducers/owner.reducer';

import { setIsOpen } from '../../redux/reducers/modal.reducer';

import { generateID } from '../../helpers/idGenerator.helper';

import {
    MAX_HEALTH_LEVEL,
    MAX_FOOD_LEVEL,
    MAX_MOOD_LEVEL,
    MAX_DIGESTION_LEVEL,
} from '../../helpers/max_values';

import {
    Button,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Container,
    Grid,
    DialogContent,
    Typography,
    Slide,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Form from '../form/form.component';
import { setActiveIndex } from '../../redux/reducers/activeIndex.reducer';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = () => {
    const { isOpen } = useSelector((state) => state.modal);

    const dispatch = useDispatch();

    const [cat, setCat] = useState({
        id: '',
        name: '',
        img: 'black',
        foodLevel: MAX_FOOD_LEVEL,
        healthLevel: MAX_HEALTH_LEVEL,
        moodLevel: MAX_MOOD_LEVEL,
        digestionLevel: MAX_DIGESTION_LEVEL,
    });

    const handleChange = useCallback((e) => {
        const { value } = e.target;

        setCat((prevCat) => ({ ...prevCat, name: value }));
    }, []);

    const startGameHandler = () => {
        if (cat.name === '') {
            alert('Name cannot be empty');
        } else {
            dispatch(addCat({ ...cat, id: generateID() }));
            setCat({
                id: '',
                name: '',
                img: 'black',
                foodLevel: MAX_FOOD_LEVEL,
                healthLevel: MAX_HEALTH_LEVEL,
                moodLevel: MAX_MOOD_LEVEL,
                digestionLevel: MAX_DIGESTION_LEVEL,
            });
            dispatch(setIsOpen());
            dispatch(setActiveIndex(0));
        }
    };

    return (
        <>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={() => dispatch(setIsOpen())}
                TransitionComponent={Transition}
                onKeyPress={(e) => e.key === 'Enter' && startGameHandler()}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => dispatch(setIsOpen())}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography
                            sx={{ ml: 2, flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            Choose a cat
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            onClick={startGameHandler}
                        >
                            Adopt
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg">
                    <Grid container>
                        <Grid item xl={12} lg={12}>
                            <DialogContent>
                                <Form
                                    cat={cat}
                                    setCat={setCat}
                                    handleChange={handleChange}
                                />
                            </DialogContent>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </>
    );
};

export default Modal;
