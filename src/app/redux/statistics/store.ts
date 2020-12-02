import { SummaryPage } from './../../models/summaryPage';
import { StatisticsSummary } from './../../models/statisticsSummary';
import { tassign } from 'tassign';
import { GET_SUMMARY_STATISTICS } from './actions';
import { RoutesPage } from 'src/app/models/routesPage';
import { CountrySummary } from 'src/app/models/CountrySummary';

export interface IStatisticsState {
    global: StatisticsSummary;
    countries: Array<CountrySummary>;

    countryWithMaxTotalCases: CountrySummary;
    countryWithMinTotalCases: CountrySummary;
    countryWithMaxTotalDeaths: CountrySummary;
    countryWithMinTotalDeaths: CountrySummary;

    date: Date;
}

export const STATISTICS_INITIAL_STATE: IStatisticsState = {
    global: null,
    countries: null,

    countryWithMaxTotalCases: null,
    countryWithMinTotalCases: null,
    countryWithMaxTotalDeaths: null,
    countryWithMinTotalDeaths: null,

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
    const result = findMinMaxTotalCasesAndDeaths(response.Countries);
    return tassign(state, {
        global: response.Global,
        countries: response.Countries,
        countryWithMaxTotalCases: result.countryWithMaxTotalCases,
        countryWithMinTotalCases: result.countryWithMinTotalCases,
        countryWithMaxTotalDeaths: result.countryWithMaxTotalDeaths,
        countryWithMinTotalDeaths: result.countryWithMinTotalDeaths,
        date: response.Date
    });
}

function findMinMaxTotalCasesAndDeaths(countries: Array<CountrySummary>) {
    let countryWithMaxTotalCases: CountrySummary;
    let countryWithMinTotalCases: CountrySummary;
    let countryWithMaxTotalDeaths: CountrySummary;
    let countryWithMinTotalDeaths: CountrySummary;

    if (countries !== null) {
        countries.forEach((country: CountrySummary) => {
            if (hasMaxTotalCases(country, countryWithMaxTotalCases)) {
                countryWithMaxTotalCases = country;
            }
            if (hasMinTotalCases(country, countryWithMinTotalCases)) {
                countryWithMinTotalCases = country;
            }
            if (hasMaxTotalDeaths(country, countryWithMaxTotalDeaths)) {
                countryWithMaxTotalDeaths = country;
            }
            if (hasMinTotalDeaths(country, countryWithMinTotalDeaths)) {
                countryWithMinTotalDeaths = country;
            }
        });
    }
    return {
        countryWithMaxTotalCases,
        countryWithMinTotalCases,
        countryWithMaxTotalDeaths,
        countryWithMinTotalDeaths
    };
}


function hasMaxTotalCases(currentCountry: CountrySummary, previousMaxTotalCountry: CountrySummary) {
    return previousMaxTotalCountry == null || currentCountry.TotalConfirmed > previousMaxTotalCountry.TotalConfirmed;
}

function hasMinTotalCases(currentCountry: CountrySummary, previousMinTotalCountry: CountrySummary) {
    return previousMinTotalCountry == null || currentCountry.TotalConfirmed < previousMinTotalCountry.TotalConfirmed;
}

function hasMaxTotalDeaths(currentCountry: CountrySummary, previousMaxDeathsCountry: CountrySummary) {
    return previousMaxDeathsCountry == null || currentCountry.TotalDeaths > previousMaxDeathsCountry.TotalDeaths;
}

function hasMinTotalDeaths(currentCountry: CountrySummary, previousMinDeathsCountry: CountrySummary) {
    return previousMinDeathsCountry == null || currentCountry.TotalDeaths < previousMinDeathsCountry.TotalDeaths;
}