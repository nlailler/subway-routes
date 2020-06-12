import { FILTERS } from './constants';

function parseRoutes(routes) {
  return routes.map(route => ({ id: route.id, name: route.attributes.long_name }));
}

export default async function getRoutes() {
  const response = await fetch(`https://api-v3.mbta.com/routes?${FILTERS.SUBWAY}`);
  const data = await response.json();
  return parseRoutes(data.data);
}
