import type { APIAirResponse } from '@weather/interfaces/api-air-quality.interface';
import type {
  AirQuality,
  AirQualityComponent,
} from '@weather/interfaces/current-weather.interface';
import { AirQualityUtils } from '@weather/utils/air-quality-utils';

export class AirQualityMapper {
  // * OpenWeather Air Quality Response Mapper
  static mapAirQualityResponseToAirQuality(
    airQuality: APIAirResponse
  ): AirQuality {
    return {
      aqi: airQuality.list[0].main.aqi,
      components: this.mapComponentsWithCategory(
        AirQualityUtils.filterComponents(airQuality.list[0].components)
      ),
    };
  }

  static mapComponentsWithCategory(components: Record<string, number>): {
    [key: string]: AirQualityComponent;
  } {
    const mappedComponents: { [key: string]: AirQualityComponent } = {};

    for (const key in components) {
      const value = components[key];
      mappedComponents[key] = {
        value,
        category: AirQualityUtils.getAirQualityCategory(key, value),
      };
    }

    return mappedComponents;
  }
}
