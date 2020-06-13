import StoreReducer, { ACTIONS } from '../src/context/StoreReducer';

const RED_LINE = { id: 'Red', name: 'Red Line' };
const ORANGE_LINE = { id: 'Orange', name: 'Orange Line' };
const ROUTES = [RED_LINE, ORANGE_LINE];

const HARVARD = { name: 'Harvard' };
const KENDALL_MIT = { name: 'Kendall/MIT' };
const STOPS = [HARVARD, KENDALL_MIT];

describe('Reducer unit tests', () => {
  test('The ROUTES_LOADED action should update routes and set isLoading', () => {
    const initialState = { isLoading: true, routes: [] };
    const expectedState = { isLoading: false, routes: ROUTES };
    const endState = StoreReducer(initialState, { type: ACTIONS.ROUTES_LOADED, routes: ROUTES });
    expect(endState).toEqual(expectedState);
  });

  test('The ROUTE_SELECTED action should update selectedRouteId', () => {
    const initialState = { isLoading: false, routes: ROUTES, selectedRouteId: null };
    const expectedState = { isLoading: false, routes: ROUTES, selectedRouteId: RED_LINE.id };
    const endState = StoreReducer(initialState, { type: ACTIONS.ROUTE_SELECTED, selectedRouteId: RED_LINE.id });
    expect(endState).toEqual(expectedState);
  });

  test('The STOPS_LOADED action should update stops and set isLoading', () => {
    const initialState = { isLoading: true, stops: [] };
    const expectedState = { isLoading: false, stops: STOPS };
    const endState = StoreReducer(initialState, { type: ACTIONS.STOPS_LOADED, stops: STOPS });
    expect(endState).toEqual(expectedState);
  });
});
