function parseStops(stops) {
  return stops.map(stop => ({ name: stop.attributes.name }));
}

export default async function getStops({ routeId }) {
  const response = await fetch(`https://api-v3.mbta.com/stops?filter[route]=${routeId}`);
  const data = await response.json();
  return parseStops(data.data);
}
