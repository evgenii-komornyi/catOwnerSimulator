import React, { useState } from 'react';
import {
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    TextField,
    Typography,
} from '@mui/material';

const Form = ({ setCatName, tick }) => {
    const [value, setValue] = useState('');

    const startGameHandler = () => {
        setCatName(value);
        tick();
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
                        <TextField
                            label="Cat name"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            sx={{ mr: 'auto', ml: 'auto' }}
                            onClick={() => startGameHandler()}
                        >
                            create
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Form;
