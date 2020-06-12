function createGetStopsButtonDataId() {
  return 'get_stops_button';
}

function createRouteListItemDataId(routeId) {
  return `route_list_item_${routeId}`;
}

function createStopListItemDataId(stopId) {
  return `stop_list_item_${stopId}`;
}

export {
  createGetStopsButtonDataId,
  createRouteListItemDataId,
  createStopListItemDataId,
};
