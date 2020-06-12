import React, { useContext, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { DisplayContext } from './context/DisplayProvider';
import useActions from './context/useActions';
import { LOADING_TEXT } from './utils/constants';
import getRoutes from './utils/getRoutes';
import RoutesContainer from './RoutesContainer';
import StopsContainer from './StopsContainer';

export default function DisplayContainer() {
  const { routesLoaded } = useActions();

  useEffect(() => {
    (async () => {
      routesLoaded({
        routes: await getRoutes(),
      });
    })();
  }, []);

  const { isLoading, routes, stops } = useContext(DisplayContext);

  return (
    <>
      {isLoading
        ? <div>{LOADING_TEXT}</div>
        : (<Box>
          <RoutesContainer routes={routes} />
          <StopsContainer stops={stops}/>
        < /Box>)
      }
    </>
  );
}
