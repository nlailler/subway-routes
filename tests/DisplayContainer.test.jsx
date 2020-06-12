import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import {
  render,
  act,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

// import useActions from '../src/context/useActions';
import getRoutes from '../src/utils/getRoutes';
import getStops from '../src/utils/getStops';

import MockApp from './MockApp';
import { LOADING_TEXT } from '../src/utils/constants';
import {
  createGetStopsButtonDataId,
  createRouteListItemDataId,
  createStopListItemDataId,
} from '../src/utils/dataId';

const GET_STOPS_BUTTON_ID = createGetStopsButtonDataId();

const RED_LINE = { id: 'Red', name: 'Red Line' };
const ORANGE_LINE = { id: 'Orange', name: 'Orange Line' };
const RED_LINE_ROUTE_ID = createRouteListItemDataId(RED_LINE.id);
const ORANGE_LINE_ROUTE_ID = createRouteListItemDataId(ORANGE_LINE.id);

const HARVARD = { name: 'Harvard' };
const KENDALL_MIT = { name: 'Kendall/MIT' };
const HARVARD_STOP_ID = createStopListItemDataId(HARVARD.name);
const KENDALL_MIT_STOP_ID = createStopListItemDataId(KENDALL_MIT.name);

const mockRoutes = () => [RED_LINE, ORANGE_LINE];
const mockStops = () => [HARVARD, KENDALL_MIT];

jest.mock('../src/utils/getRoutes');
jest.mock('../src/utils/getStops');

describe('Test display container', () => {
  beforeEach(() => {
    getRoutes.mockClear();
    getStops.mockClear();
  });

  test('Should show loading when the app is loading.', async () => {
    const promise = Promise.resolve([]);
    getRoutes.mockImplementationOnce(() => promise);
    const initialState = { isLoading: true, routes: [], stops: [] };
    const { queryByText } = render(<MockApp initialState={initialState}/>);
    expect(queryByText(LOADING_TEXT)).toBeInTheDocument();

    await act(() => promise);
  });

  test('Should not show loading and should show get stops button instead when the app is done loading.', async () => {
    getRoutes.mockImplementationOnce(() => Promise.resolve(mockRoutes()));
    const initialState = { isLoading: true, routes: [], stops: [] };
    const { queryByText, queryByTestId } = render(<MockApp initialState={initialState}/>);

    await waitForElementToBeRemoved(queryByText(LOADING_TEXT), () => {
      expect(queryByTestId(GET_STOPS_BUTTON_ID)).toBeInTheDocument();
      expect(queryByTestId(RED_LINE_ROUTE_ID)).toBeInTheDocument();
      expect(queryByTestId(ORANGE_LINE_ROUTE_ID)).toBeInTheDocument();
    });
  });

  test('Should not show stops when get stops is clicked but a route has not been selected', async () => {
    getRoutes.mockImplementationOnce(() => Promise.resolve(mockRoutes()));
    getStops.mockImplementationOnce(() => Promise.resolve(mockStops()));
    const alert = jest.fn();
    jest.spyOn(window, 'alert').mockImplementationOnce(alert);

    const initialState = { isLoading: true, routes: [], stops: [] };
    const { queryByText, queryByTestId } = render(<MockApp initialState={initialState}/>);

    await waitForElementToBeRemoved(queryByText(LOADING_TEXT));

    const getStopsButton = queryByTestId(GET_STOPS_BUTTON_ID);
    fireEvent.click(getStopsButton);

    expect(alert).toHaveBeenCalled();
    const harvardStop = queryByTestId(HARVARD_STOP_ID);
    expect(harvardStop).not.toBeInTheDocument();
  });

  test('Should show stops when route is selected and get stops is clicked', async () => {
    getRoutes.mockImplementationOnce(() => Promise.resolve(mockRoutes()));
    getStops.mockImplementationOnce(() => Promise.resolve(mockStops()));

    const initialState = { isLoading: true, routes: [], stops: [] };
    const { queryByText, queryByTestId } = render(<MockApp initialState={initialState}/>);

    await waitForElementToBeRemoved(queryByText(LOADING_TEXT));

    const redLineRoute = queryByTestId(RED_LINE_ROUTE_ID);
    fireEvent.click(redLineRoute);

    const getStopsButton = queryByTestId(GET_STOPS_BUTTON_ID);
    fireEvent.click(getStopsButton);

    await waitFor(() => {
      expect(queryByTestId(HARVARD_STOP_ID)).toBeInTheDocument();
      expect(queryByTestId(KENDALL_MIT_STOP_ID)).toBeInTheDocument();
    });
  });
});
