import React, { useContext, useEffect } from 'react';
import { Box, Button } from '@material-ui/core';
import { DisplayContext } from './context/DisplayProvider';
import useActions from './context/useActions';
import { LOADING_TEXT } from './utils/constants';
import getRoutes from './utils/getRoutes';
import RoutesContainer from './RoutesContainer';
import StopsContainer from './StopsContainer';
import getStops from './utils/getStops';

export default function DisplayContainer() {
  const { routesLoaded, stopsLoaded } = useActions();

  useEffect(() => {
    (async () => {
      routesLoaded({
        routes: await getRoutes(),
      });
    })();
  }, []);

  const { isLoading, selectedRouteId, stops } = useContext(DisplayContext);
  const onClick = async () => {
    stopsLoaded({ stops: await getStops({ routeId: selectedRouteId }) });
  };
  return (
    <>
      {isLoading
        ? <div>{LOADING_TEXT}</div>
        : (
          <Box display="flex" flexDirection="row" alignItems="center">
            <RoutesContainer />
            <Button variant="outlined" onClick={onClick} style={{ maxHeight: '30px' }}> Get Stops</Button>
            <StopsContainer stops={stops}/>
          </Box>
        )
      }
    </>
  );
}
