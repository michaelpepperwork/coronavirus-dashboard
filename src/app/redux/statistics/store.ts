import { SummaryPage } from './../../models/summaryPage';
import { StatisticsSummary } from './../../models/statisticsSummary';
import { tassign } from 'tassign';
import { GET_SUMMARY_STATISTICS } from './actions';
import { RoutesPage } from 'src/app/models/routesPage';
import { CountrySummary } from 'src/app/models/CountrySummary';

export interface IStatisticsState {
    global: StatisticsSummary;
    countries: Array<CountrySummary>;
    date: Date;
}

export const STATISTICS_INITIAL_STATE: IStatisticsState = {
    global: null,
    countries: [],
    date: null,
};

export function statisticsReducer(state: IStatisticsState = STATISTICS_INITIAL_STATE, action): IStatisticsState {
    switch (action.type) {

        case `${GET_SUMMARY_STATISTICS}_SUCCESS`:
            return statisticsReceived(state, action);

    }
    return state;
}


function statisticsReceived(state, action) {
    const response: SummaryPage = action.response;
    return tassign(state, {
        global: response.Global,
        countries: response.Countries,
        date: response.Date
    });
}

