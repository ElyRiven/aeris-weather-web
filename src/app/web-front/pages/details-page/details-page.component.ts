import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';

import type { UserLocation } from '@front/interfaces/location.interface';
import type { ForecastList } from '@weather/interfaces/forecast.interface';
import type { ChartData } from '@front/interfaces/chart.interface';

import { GeolocationService } from '@geolocation/services/geolocation.service';
import { ForecastService } from '@weather/services/forecast-weather.service';

import { DetailsCardComponent } from './details-card/details-card.component';
import { ForecastChartComponent } from './forecast-chart/forecast-chart.component';
import { TitleSectionComponent } from '@front/components/title-section/title-section.component';

@Component({
  selector: 'details-page',
  imports: [
    TitleSectionComponent,
    DetailsCardComponent,
    ForecastChartComponent,
  ],
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  #geolocationService = inject(GeolocationService);
  #forecastService = inject(ForecastService);
  #route = inject(ActivatedRoute);

  public date = toSignal(this.#route.params.pipe(map(({ date }) => date)));

  public windChartData = signal<ChartData | undefined>(undefined);
  public pressureChartData = signal<ChartData | undefined>(undefined);
  public visibilityChartData = signal<ChartData | undefined>(undefined);
  public CloudsHumidityChartData = signal<ChartData | undefined>(undefined);

  constructor() {
    // Inicializar chartData cuando cambie el forecast seleccionado
    const forecast = this.#forecastService.getSelectedForecast();
    if (forecast) {
      this.updateChartsData(forecast);
    }
  }

  currentLocation(): UserLocation {
    return this.#geolocationService.getCurrentLocation();
  }

  selectedForecast(): ForecastList | undefined {
    return this.#forecastService.getSelectedForecast();
  }

  private updateChartsData(forecast: ForecastList): void {
    const chartType: string = forecast.list.length < 2 ? 'bar' : 'line';

    const labels = forecast.list.map((item) => {
      const hour = parseInt(item.time.slice(0, 2));

      if (hour === 0) return '12 am';
      if (hour === 12) return '12 pm';

      return hour > 12 ? `${hour - 12} pm` : `${hour} am`;
    });

    const windSpeed = forecast.list.map((item) => item.wind.speed);
    const pressure = forecast.list.map((item) => item.pressure);
    const visibility = forecast.list.map((item) =>
      Number((item.visibility / 1000).toFixed(1))
    );

    const clouds = forecast.list.map((item) => item.clouds);
    const humidity = forecast.list.map((item) => item.humidity);

    this.windChartData.set({
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Wind',
            data: windSpeed,
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      title: 'Wind, m/s',
    });

    this.pressureChartData.set({
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Pressure',
            data: pressure,
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      title: 'Pressure, mmgh',
    });

    this.visibilityChartData.set({
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Visibility',
            data: visibility,
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      title: 'Visibility, km',
    });

    this.CloudsHumidityChartData.set({
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: 'Clouds',
            data: clouds,
            borderWidth: 2,
            pointRadius: 4,
          },
          {
            label: 'Humidity',
            data: humidity,
            borderWidth: 2,
            pointRadius: 4,
          },
        ],
      },
      title: 'Clouds and Humidity',
    });
  }
}
