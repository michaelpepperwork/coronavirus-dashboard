import { combineReducers } from 'redux';

// tslint:disable-next-line:no-empty-interface
export interface IAppState {
    // auth: IAuthState;
}

export const INITIAL_STATE: IAppState = {
    // auth: AUTH_INITIAL_STATE,
};

export const rootReducer = combineReducers<IAppState>({
    // auth: authReducer,
});
