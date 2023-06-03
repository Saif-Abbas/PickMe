export function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
  const earthRadius = 6371;

  const latitudeDifference = ((lat2 - lat1) * Math.PI) / 180;
  const longitudeDifference = ((lon2 - lon1) * Math.PI) / 180;

  const squaredSinHalfLatitudeDifference =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2);
  const cosLatitude1 = Math.cos((lat1 * Math.PI) / 180);
  const cosLatitude2 = Math.cos((lat2 * Math.PI) / 180);
  const squaredSinHalfLongitudeDifference =
    Math.sin(longitudeDifference / 2) * Math.sin(longitudeDifference / 2);

  const a =
    squaredSinHalfLatitudeDifference +
    cosLatitude1 * cosLatitude2 * squaredSinHalfLongitudeDifference;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance;
}
