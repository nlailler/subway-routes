import React, { useContext } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { DisplayContext } from './context/DisplayProvider';
import useActions from './context/useActions';

export default function RoutesContainer() {
  const { routes, selectedRouteId } = useContext(DisplayContext);
  const { routeSelected } = useActions();
  return (
    <List>
      {routes.map(route => (
        <ListItem
          button
          selected={selectedRouteId === route.id}
          key={route.id}
          onClick={() => routeSelected({ selectedRouteId: route.id })}
        >
          <ListItemText primary={route.name} />
        </ListItem>
      ))}
    </List>
  );
}
