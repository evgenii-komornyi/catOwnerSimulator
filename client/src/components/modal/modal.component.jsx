import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addCat } from '../../redux/reducers/owner.reducer';

import { setIsOpen } from '../../redux/reducers/modal.reducer';

import { generateID } from '../../helpers/idGenerator.helper';

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

const MAX_FOOD_LEVEL = 100;
const MAX_HEALTH_LEVEL = 100;
const MAX_MOOD_LEVEL = 100;
const MAX_DIGESTION_LEVEL = 30;

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
        <div>
            <Dialog
                fullScreen
                open={isOpen}
                onClose={() => dispatch(setIsOpen())}
                TransitionComponent={Transition}
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
                        <Grid item lg={12}>
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
        </div>
    );
};

export default Modal;
