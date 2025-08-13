import type { APIAirResponse } from '@weather/interfaces/api-air-quality.interface';
import type { AirQuality } from '@weather/interfaces/current-weather.interface';
import { AirQualityUtils } from '@weather/utils/air-quality-utils';

export class AirQualityMapper {
  // * OpenWeather Air Quality Response Mapper
  static mapAirQualityResponseToAirQuality(
    airQuality: APIAirResponse
  ): AirQuality {
    return {
      aqi: airQuality.list[0].main.aqi,
      components: AirQualityUtils.filterComponents(
        airQuality.list[0].components
      ),
    };
  }
}
