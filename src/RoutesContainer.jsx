import React, { useContext } from 'react';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { DisplayContext } from './context/DisplayProvider';
import useActions from './context/useActions';
import { createRouteListItemDataId } from './utils/dataId';

export default function RoutesContainer() {
  const { routes, selectedRouteId } = useContext(DisplayContext);
  const { routeSelected } = useActions();
  return (
    <Box maxHeight={600} overflow="auto">
      <Box ml={2}>Click a subway route</Box>
      <List>
        {routes.map(route => (
          <ListItem
            button
            dense
            selected={selectedRouteId === route.id}
            key={route.id}
            data-testid={createRouteListItemDataId(route.id)}
            onClick={() => routeSelected({ selectedRouteId: route.id })}
          >
            <ListItemText primary={route.name} secondary="Name"/>
            <ListItemText primary={route.id} secondary="ID"/>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
