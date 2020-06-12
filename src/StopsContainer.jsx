import React from 'react';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';

export default function StopsContainer(props) {
  const { stops } = props;
  return (
    <Box maxHeight={400} overflow="auto">
      <List>
        {stops.map(stop => (
          <ListItem key={stop.name} dense>
            <ListItemText primary={stop.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
