import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { VolumeUp, VolumeOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { setIsSound, setVolume } from '../../redux/reducers/sound.reducer';

const Input = styled(MuiInput)`
    width: 42px;
`;

const VolumeSlider = () => {
    const { isSound, volume } = useSelector((state) => state.sound);
    const dispatch = useDispatch();

    const handleSliderChange = (event, newValue) => {
        dispatch(setVolume(newValue));
    };

    const handleInputChange = (event) => {
        dispatch(
            setVolume(
                event.target.value === '' ? '' : Number(event.target.value)
            )
        );
    };

    const handleBlur = () => {
        if (volume < 0) {
            dispatch(setVolume(0));
        } else if (volume > 100) {
            dispatch(setVolume(100));
        }
    };

    return (
        <Box sx={{ width: 250 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={() => dispatch(setIsSound())}
                    >
                        {isSound ? <VolumeUp /> : <VolumeOff />}
                    </IconButton>
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof volume === 'number' ? volume : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={volume}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default VolumeSlider;
