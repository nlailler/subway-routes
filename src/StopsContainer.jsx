import React from 'react';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { createStopListItemDataId } from './utils/dataId';

export default function StopsContainer(props) {
  const { stops } = props;
  return (
    <Box maxHeight={400} overflow="auto">
      <List>
        {stops.map(stop => (
          <ListItem dense key={stop.name} data-testid={createStopListItemDataId(stop.name)}>
            <ListItemText primary={stop.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
