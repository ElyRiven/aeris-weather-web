export interface UserLocation {
  city: string;
  country: string;
  coords: UserCoordinates;
}

export interface UserCoordinates {
  lat: number;
  long: number;
}
