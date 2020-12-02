import { RoutesPage } from './../../models/routesPage';
import { Route } from './../../models/route';
import { GET_BASE_ROUTES } from './actions';
import { tassign } from 'tassign';


export interface IGeneralState {
    routes: RoutesPage;
}

export const GENERAL_INITIAL_STATE: IGeneralState = {
    routes: {},
};

export function generalReducer(state: IGeneralState = GENERAL_INITIAL_STATE, action): IGeneralState {
    switch (action.type) {

        case `${GET_BASE_ROUTES}_SUCCESS`:
            return routesReceived(state, action);

    }
    return state;
}


function routesReceived(state, action) {
    return tassign(state, {
        routes: action.response
    });
}
