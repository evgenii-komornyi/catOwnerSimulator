import { catReducer } from './reducers/cat.reducer';
import { ownerReducer } from './reducers/owner.reducer';
import { toiletReducer } from './reducers/toilet.reducer';

export const rootReducer = {
    owner: ownerReducer,
    cat: catReducer,
    toilet: toiletReducer,
};
