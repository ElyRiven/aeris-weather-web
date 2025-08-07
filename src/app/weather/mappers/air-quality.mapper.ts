import type { APIAirResponse } from '@weather/interfaces/api-air-quality.interface';
import type { AirQuality } from '@weather/interfaces/current-weather.interface';

export class AirQualityMapper {
  // * OpenWeather Air Quality Response Mapper
  static mapAirQualityResponseToAirQuality(
    airQuality: APIAirResponse
  ): AirQuality {
    return {
      aqi: airQuality.list[0].main.aqi,
      components: airQuality.list[0].components,
    };
  }
}
