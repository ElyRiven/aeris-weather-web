import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';

import type {
  FiveDaysForecast,
  Forecast,
  ForecastList,
} from '@weather/interfaces/forecast.interface';
import type { Wind } from '@weather/interfaces/api-weather-response.interface';

import { ForecastService } from '@weather/services/forecast-weather.service';
import { TemperatureService } from '@shared/services/temperature.service';

import { VisibilityPipe } from '@weather/pipes/visibility.pipe';
import { TemperaturePipe } from '@weather/pipes/temperature.pipe';

import { WeatherUtils } from '@weather/utils/weather-utils';

@Component({
  selector: 'forecast-card',
  imports: [RouterLink, DatePipe, VisibilityPipe, DecimalPipe, TemperaturePipe],
  templateUrl: './forecast-card.component.html',
})
export class ForecastCardComponent {
  #temperatureService = inject(TemperatureService);
  #forecastService = inject(ForecastService);

  public forecast = input<FiveDaysForecast>();

  temperatureUnit() {
    return this.#temperatureService.currentUnit();
  }

  setSelectedForecast(forecast: ForecastList) {
    this.#forecastService.setSelectedForecast(forecast);
  }

  getDayPart(time: string): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = parseInt(time.split(':')[0]);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
  }

  getWeatherProperty<T extends keyof Forecast>(
    forecasts: Forecast[],
    property: T,
    dayPart: 'morning' | 'afternoon' | 'evening' | 'night'
  ): Forecast[T] | undefined {
    const dayPartForecast = forecasts.find(
      (f) => this.getDayPart(f.time) === dayPart
    );
    if (!dayPartForecast) return undefined;

    return dayPartForecast[property];
  }

  getWindProperty<T extends keyof Wind>(
    forecasts: Forecast[],
    property: T,
    dayPart: 'morning' | 'afternoon' | 'evening' | 'night'
  ): number | undefined {
    const wind = this.getWeatherProperty(forecasts, 'wind', dayPart);
    if (!wind) return undefined;
    return wind[property] as number;
  }

  hasDataForDayPart(
    forecasts: Forecast[],
    dayPart: 'morning' | 'afternoon' | 'evening' | 'night'
  ): boolean {
    return forecasts.some((f) => this.getDayPart(f.time) === dayPart);
  }

  getWindDirectionClass(degrees: number | undefined): string {
    if (!degrees) return '';

    return WeatherUtils.getWindDirectionClass(degrees);
  }
}
