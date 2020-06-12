import { useContext } from 'react';
import { ACTIONS } from './StoreReducer';
import { DisplayContext } from './DisplayProvider';

function routesLoaded({ dispatch, data }) {
  const { routes } = data;
  dispatch({ type: ACTIONS.ROUTES_LOADED, routes });
}

function routeSelected({ dispatch, data }) {
  const { selectedRouteId } = data;
  dispatch({ type: ACTIONS.ROUTE_SELECTED, selectedRouteId });
}

function stopsLoaded({ dispatch, data }) {
  const { stops } = data;
  dispatch({ type: ACTIONS.STOPS_LOADED, stops });
}

export default function useActions() {
  const { dispatch } = useContext(DisplayContext);

  return {
    routesLoaded: (data) => routesLoaded({ dispatch, data }),
    routeSelected: (data) => routeSelected({ dispatch, data }),
    stopsLoaded: (data) => stopsLoaded({ dispatch, data }),
  };
}
