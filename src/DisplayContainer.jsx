import React, { useContext, useEffect } from 'react';
import { Box, List, ListItem } from '@material-ui/core';
import { DisplayContext } from './context/DisplayProvider';
import useActions from './context/useActions';
import { LOADING_TEXT } from './utils/constants';

export default function DisplayContainer() {
  const { } = useActions();

  useEffect(() => {
    (async () => {})();
  }, []);

  const { isLoading } = useContext(DisplayContext);

  return (
    <>
      {isLoading
        ? <div>{LOADING_TEXT}</div>
        : (<Box />)
      }
    </>
  );
}
