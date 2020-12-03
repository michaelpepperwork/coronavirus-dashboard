import { SummaryPage } from '../../models/summaryPage';
import { tassign } from 'tassign';
import { CountrySummary } from 'src/app/models/CountrySummary';
import { GET_COUNTRY_HISTORY } from './actions';
import { HistoricalStatistic } from 'src/app/models/historicalStatistic';

export interface IStatisticsHistoryState {
    [countrySlug: string]: {
        maxDeathsRecord: HistoricalStatistic;
        maxCasesRecord: HistoricalStatistic;
        history: Array<HistoricalStatistic>;
    };
}

export const STATISTICS_HISTORY_INITIAL_STATE: IStatisticsHistoryState = {
};

export function statisticsHistoryReducer(
    state: IStatisticsHistoryState = STATISTICS_HISTORY_INITIAL_STATE,
    action): IStatisticsHistoryState {
    switch (action.type) {

        case `${GET_COUNTRY_HISTORY}_SUCCESS`:
            return historyReceived(state, action);

    }
    return state;
}


function historyReceived(state, action) {
    const response: Array<HistoricalStatistic> = action.response;
    const countrySlug = action.variables.countrySlug;

    const countryHistory = findMaxDeathsAndCasesDates(response);
    const newState = {};
    newState[countrySlug] = countryHistory;
    return tassign(state, newState);
}

function findMaxDeathsAndCasesDates(historicalStatistics: Array<HistoricalStatistic>) {
    let maxDeathsRecord: HistoricalStatistic;
    let maxCasesRecord: HistoricalStatistic;

    historicalStatistics.forEach((record) => {
        if (isMaxDeathsDate(record, maxDeathsRecord)) {
            maxDeathsRecord = record;
        }
        if (isMaxConfirmedDate(record, maxCasesRecord)) {
            maxCasesRecord = record;
        }
    });
    return {
        maxDeathsRecord,
        maxCasesRecord,
        history: historicalStatistics
    };
}

function isMaxDeathsDate(currentRecord: HistoricalStatistic, maxDeathsRecord: HistoricalStatistic) {
    return maxDeathsRecord == null || currentRecord.Deaths >= maxDeathsRecord.Deaths;
}

function isMaxConfirmedDate(currentRecord: HistoricalStatistic, maxCasesRecord: HistoricalStatistic) {
    return maxCasesRecord == null || currentRecord.Confirmed >= maxCasesRecord.Confirmed;
}
