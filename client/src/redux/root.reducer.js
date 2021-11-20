import { activeIndexReducer } from './reducers/activeIndex.reducer';
import { catReducer } from './reducers/cat.reducer';
import { intervalReducer } from './reducers/interval.reducer';
import { modalReducer } from './reducers/modal.reducer';
import { ownerReducer } from './reducers/owner.reducer';
import { soundReducer } from './reducers/sound.reducer';

export const rootReducer = {
    owner: ownerReducer,
    cat: catReducer,
    modal: modalReducer,
    interval: intervalReducer,
    activeIndex: activeIndexReducer,
    sound: soundReducer,
};
