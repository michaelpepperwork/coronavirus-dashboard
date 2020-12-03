import { IStatisticsState, STATISTICS_INITIAL_STATE, statisticsReducer } from './statistics/store';
import { IGeneralState, GENERAL_INITIAL_STATE, generalReducer } from './general/store';
import { combineReducers } from 'redux';
import { STATISTICS_HISTORY_INITIAL_STATE, statisticsHistoryReducer, IStatisticsHistoryState } from './statisticsHistory/store';

export interface IAppState {
    general: IGeneralState;
    statistics: IStatisticsState;
    statisticsHistory: IStatisticsHistoryState;
}

export const INITIAL_STATE: IAppState = {
    general: GENERAL_INITIAL_STATE,
    statistics: STATISTICS_INITIAL_STATE,
    statisticsHistory: STATISTICS_HISTORY_INITIAL_STATE
};

export const rootReducer = combineReducers<IAppState>({
    general: generalReducer,
    statistics: statisticsReducer,
    statisticsHistory: statisticsHistoryReducer
});
