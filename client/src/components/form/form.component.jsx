import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCat } from '../../redux/reducers/cat.reducer';
import { setToilet } from '../../redux/reducers/toilet.reducer';

import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
} from '@mui/material';
import { generateID } from '../../helpers/idGenerator.helper';

const Form = ({ tick }) => {
    const [cat, setCat] = useState({ id: '', name: '', img: 'black' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCat({ ...cat, id: generateID(), [name]: value });
    };

    const startGameHandler = () => {
        if (cat.name === '') {
            alert('Name cannot be empty');
        } else {
            dispatch(createCat(cat));
            dispatch(setToilet({ id: generateID() }));
            tick();
        }
    };

    return (
        <Grid container>
            <Grid item lg={12} sx={{ textAlign: 'center' }}>
                <Card
                    variant="outlined"
                    sx={{ maxWidth: 700, mr: 'auto', ml: 'auto' }}
                >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Create your cat
                        </Typography>
                        <Grid container>
                            <Grid item lg={12}>
                                <TextField
                                    label="Cat name"
                                    value={cat.name}
                                    name="name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item lg={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Color
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="color"
                                        name="img"
                                        value={cat.img}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="black"
                                            control={<Radio />}
                                            label="Black"
                                        />
                                        <FormControlLabel
                                            value="white"
                                            control={<Radio />}
                                            label="White"
                                        />
                                        <FormControlLabel
                                            value="brown"
                                            control={<Radio />}
                                            label="Brown"
                                        />
                                        <FormControlLabel
                                            value="point"
                                            control={<Radio />}
                                            label="Point"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            sx={{ mr: 'auto', ml: 'auto' }}
                            onClick={startGameHandler}
                        >
                            create
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item lg={12} sx={{ mt: 2 }}>
                <Card
                    variant="outlined"
                    sx={{
                        textAlign: 'center',
                        maxWidth: 700,
                        mr: 'auto',
                        ml: 'auto',
                    }}
                >
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {cat.name}
                        </Typography>
                        <img
                            src={`https://komornyi.space/static/img/cat_project/img/cats/${cat.img}.png`}
                            alt={cat.name}
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Form;
