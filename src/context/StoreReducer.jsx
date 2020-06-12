export const ACTIONS = {
  ROUTES_LOADED: 'ROUTES_LOADED',
  ROUTE_SELECTED: 'ROUTE_SELECTED',
  STOPS_LOADED: 'STOPS_LOADED'
};

export const INITIAL_STATE = {
  isLoading: true,
  routes: [],
  selectedRouteId: null,
  stops: [],
  dispatch: () => { console.error('dispatch not set'); } // eslint-disable-line no-console
};

export default function reducer (state, action) {
  switch (action.type) {
  case ACTIONS.ROUTES_LOADED:
    return { ...state, isLoading: false, routes: action.routes };
  case ACTIONS.ROUTE_SELECTED:
    return { ...state, selectedRouteId: action.selectedRouteId };
  case ACTIONS.STOPS_LOADED:
    return { ...state, isLoading: false, stops: action.stops };
  default:
    throw new Error();
  }
};
