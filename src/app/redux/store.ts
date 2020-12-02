import { IStatisticsState, STATISTICS_INITIAL_STATE, statisticsReducer } from './statistics/store';
import { IGeneralState, GENERAL_INITIAL_STATE, generalReducer } from './general/store';
import { combineReducers } from 'redux';

// tslint:disable-next-line:no-empty-interface
export interface IAppState {
    general: IGeneralState;
    statistics: IStatisticsState;
}

export const INITIAL_STATE: IAppState = {
    general: GENERAL_INITIAL_STATE,
    statistics: STATISTICS_INITIAL_STATE,
};

export const rootReducer = combineReducers<IAppState>({
    general: generalReducer,
    statistics: statisticsReducer,
});
