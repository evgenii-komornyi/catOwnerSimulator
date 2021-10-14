import React, { useState, useEffect } from 'react';

import {
    Card,
    Grid,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cat = ({ catName, currentFood, currentHealth, feed }) => {
    const [warning, setWarning] = useState('');

    const checkHealthLevel = () => {
        switch (true) {
            case currentHealth.current >= 80 && currentHealth.current <= 100:
                return '#00ff00';
            case currentHealth.current >= 60 && currentHealth.current < 80:
                return '#fff000';
            case currentHealth.current >= 40 && currentHealth.current < 60:
                return '#ff8c00';
            case currentHealth.current >= 20 && currentHealth.current < 40:
                return '#ff4500';
            case currentHealth.current >= 0 && currentHealth.current < 20:
                return '#ff0000';
            default:
                break;
        }
    };

    const checkFoodLevel = () => {
        switch (true) {
            case currentFood.current >= 80 && currentFood.current <= 100:
                return '#00ff00';
            case currentFood.current >= 60 && currentFood.current < 80:
                return '#fff000';
            case currentFood.current >= 40 && currentFood.current < 60:
                return '#ff8c00';
            case currentFood.current >= 20 && currentFood.current < 40:
                return '#ff4500';
            case currentFood.current >= 0 && currentFood.current < 20:
                return '#ff0000';
            default:
                break;
        }
    };

    const checkForWarnings = () => {
        if (currentFood.current === 100) {
            setWarning('Cat does not want to eat!');
        } else if (currentHealth.current <= 0) {
            setWarning('You are killed your cat :(');
        } else {
            setWarning('');
        }
    };

    useEffect(() => {
        checkForWarnings();
    }, [currentFood.current]);

    return (
        <Grid container>
            <Grid item lg={12}>
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar sx={{ backgroundColor: 'grey' }}>
                                {catName[0]}
                            </Avatar>
                        }
                        title={catName}
                    />
                    <CardContent>
                        <Grid container item lg={12} spacing={2}>
                            <Grid item lg={2} sx={{ textAlign: 'right' }}>
                                <FontAwesomeIcon
                                    icon={['fas', 'heart']}
                                    style={{
                                        color: 'red',
                                        position: 'relative',
                                        bottom: '10px',
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={10}
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                {currentHealth.current > 0 && (
                                    <div
                                        style={{
                                            width: `${currentHealth.current}%`,
                                            height: '2px',
                                            padding: '2px',
                                            background: '#fff',
                                        }}
                                    />
                                )}
                            </Grid>
                            <Grid item lg={2} sx={{ textAlign: 'right' }}>
                                <FontAwesomeIcon
                                    icon={['fas', 'drumstick-bite']}
                                    style={{
                                        color: 'brown',
                                        position: 'relative',
                                        bottom: '10px',
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={10}
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                {currentFood.current > 0 && (
                                    <div
                                        style={{
                                            width: `${currentFood.current}%`,
                                            height: '2px',
                                            padding: '2px',
                                            background: '#fff',
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        {currentHealth.current !== 0 && (
                            <Button variant="outlined" onClick={feed}>
                                Feed {catName}
                            </Button>
                        )}
                    </CardActions>
                </Card>
            </Grid>
            <Grid item lg={12}>
                {warning !== '' && (
                    <Typography variant="h6">{warning}</Typography>
                )}
            </Grid>
        </Grid>
    );
};

export default Cat;
