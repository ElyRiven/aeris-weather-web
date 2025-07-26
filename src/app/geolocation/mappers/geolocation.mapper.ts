import { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationResponse } from '@geolocation/interfaces/geolocation-resp.interface';
import { DefaultGeolocation } from '@geolocation/interfaces/ipapi-resp.interface';

export class GeolocationMapper {
  // * OpenWeather Mapper
  static mapGeolocationToUserLocation(
    geolocation: GeolocationResponse,
    preciseLat: number,
    preciseLon: number
  ): UserLocation {
    return {
      location: geolocation.name,
      country: geolocation.country,
      state: geolocation.state,
      lat: preciseLat,
      lon: preciseLon,
    };
  }

  // * IpAPI Mapper
  static mapDefaultGeolocationToUserLocation(
    geolocation: DefaultGeolocation
  ): UserLocation {
    return {
      location: geolocation.city,
      country: geolocation.countryCode,
      state: geolocation.regionName,
      lat: geolocation.lat,
      lon: geolocation.lon,
    };
  }
}
