export const ACTIONS = {};

export const INITIAL_STATE = {
  isLoading: true,
  dispatch: () => { console.error('dispatch not set'); } // eslint-disable-line no-console
};

export default function reducer (state, action) {
  switch (action.type) {
  default:
    throw new Error();
  }
};
