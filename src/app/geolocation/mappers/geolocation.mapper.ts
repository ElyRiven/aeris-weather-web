import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationResponse } from '@geolocation/interfaces/geolocation-resp.interface';
import { DefaultGeolocation } from '@geolocation/interfaces/ipapi-resp.interface';

export class GeolocationMapper {
  static mapGeolocationToUserLocation(
    geolocation: GeolocationResponse
  ): UserLocation {
    return {
      location: geolocation.name,
      country: geolocation.country,
      state: geolocation.state,
      lat: geolocation.lat,
      lon: geolocation.lon,
    };
  }

  // * IpAPI Mapper
  static mapDefaultGeolocationToUserLocation(
    geolocation: DefaultGeolocation
  ): UserLocation {
    return {
      location: geolocation.city,
      country: geolocation.country,
      state: geolocation.regionName,
      lat: geolocation.lat,
      lon: geolocation.lon,
    };
  }
}
