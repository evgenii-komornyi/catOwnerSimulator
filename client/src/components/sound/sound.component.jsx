import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setSound } from '../../redux/reducers/sound.reducer';

const Sound = () => {
    const audioRef = useRef();
    const { sound, isSound, volume } = useSelector((state) => state.sound);

    const [active, setActive] = useState(false);

    const toggleActive = () => {
        setActive(!active);
    };

    const dispatch = useDispatch();

    useEffect(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            audioElement.volume = volume / 100;

            audioElement.load();

            const playPromise = audioElement.play();
            if (playPromise) {
                playPromise
                    .then((_) => {
                        return audioElement.play();
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            }
        }

        sound !== '' &&
            audioElement.addEventListener('ended', () => {
                dispatch(setSound(''));
            });
    }, [sound, dispatch]);

    return (
        sound !== '' && (
            <>
                <audio ref={audioRef} muted={!isSound} onEnded={toggleActive}>
                    <source
                        src={`${process.env.REACT_APP_HOST_AUDIO_URL}/${sound}.mp3`}
                        type="audio/mpeg"
                    />
                </audio>
            </>
        )
    );
};

export default Sound;
