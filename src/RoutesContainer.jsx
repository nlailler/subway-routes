import React, { useContext } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { DisplayContext } from './context/DisplayProvider';

export default function RoutesContainer() {
  const { routes } = useContext(DisplayContext);
  return (
    <List>
      {routes.map(route => (
        <ListItem button key={route.id}>
          <ListItemText primary={route.name} />
        </ListItem>
      ))}
    </List>
  );
}
