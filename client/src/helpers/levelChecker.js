import { MAX_FOOD_LEVEL, MAX_HEALTH_LEVEL, MAX_MOOD_LEVEL } from './max_values';

const levels = {
    health: {
        min: 0,
        max: MAX_HEALTH_LEVEL,
        full: 'full',
        empty: 'empty',
    },
    food: {
        min: 0,
        max: MAX_FOOD_LEVEL,
        full: 'full',
        empty: 'empty',
    },
    mood: {
        min: 0,
        max: MAX_MOOD_LEVEL,
        full: 'full',
        empty: 'empty',
    },
};

export const checkLevel = (value, level) => {
    if (value > levels[level].min && value <= levels[level].max)
        return `${process.env.REACT_APP_HOST_IMG_URL}/levels/${level}_${levels[level].full}.png`;
    else if (value <= levels[level].min)
        return `${process.env.REACT_APP_HOST_IMG_URL}/levels/${level}_${levels[level].empty}.png`;
};
