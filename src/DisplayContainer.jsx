import React, { useContext, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createGetStopsButtonDataId } from './utils/dataId';
import { DisplayContext } from './context/DisplayProvider';
import useActions from './context/useActions';
import { LOADING_TEXT, GET_STOPS_TEXT } from './utils/constants';
import getRoutes from './utils/getRoutes';
import RoutesContainer from './RoutesContainer';
import StopsContainer from './StopsContainer';
import getStops from './utils/getStops';

const GET_STOPS_BUTTON_ID = createGetStopsButtonDataId();
const useStyles = makeStyles({
  centerButton: {
    margin: '2rem',
    maxHeight: '2rem',
  },
});

export default function DisplayContainer() {
  const { routesLoaded, stopsLoaded } = useActions();
  const styles = useStyles();

  useEffect(() => {
    (async () => {
      routesLoaded({
        routes: await getRoutes(),
      });
    })();
  }, []);

  const { isLoading, selectedRouteId, stops } = useContext(DisplayContext);
  const onClick = async () => {
    if(!selectedRouteId) {
      // TODO: Convert this into a toast or something similar.
      window.alert('Must select a route');
      return;
    }
    stopsLoaded({ stops: await getStops({ routeId: selectedRouteId }) });
  };
  return (
    <>
      {isLoading
        ? <div>{LOADING_TEXT}</div>
        : (
          <Box display="flex" flexDirection="row" alignItems="center">
            <RoutesContainer />
            <Button data-testid={GET_STOPS_BUTTON_ID} className={styles.centerButton} variant="outlined" onClick={onClick}>{GET_STOPS_TEXT}</Button>
            <StopsContainer stops={stops}/>
          </Box>
        )
      }
    </>
  );
}
