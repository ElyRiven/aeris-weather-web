import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';

import type { ChartData } from '@front/interfaces/chart.interface';

Chart.register(...registerables);
Chart.defaults.font.family = 'jost';

@Component({
  selector: 'forecast-chart',
  imports: [],
  templateUrl: './forecast-chart.component.html',
})
export class ForecastChartComponent implements AfterViewInit {
  public chartCanvas = viewChild<ElementRef>('forecastChart');
  public forecastData = input<ChartData>();

  ngAfterViewInit(): void {
    if (!this.forecastData()) return;

    const chartType = this.forecastData()?.type;
    const chartData = this.forecastData()?.data;
    const chartTitle = this.forecastData()?.title;

    this.canvasInit(chartType, chartData, chartTitle);
  }

  canvasInit(type: any, data: any, title: any) {
    const canvas = this.chartCanvas()?.nativeElement;

    if (!canvas) return;

    new Chart(canvas, {
      type,
      data,
      // {
      //   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      //   datasets: [
      //     {
      //       label: '# of Votes',
      //       data: [12, 19, 3, 5, 2, 3],
      //       borderWidth: 1,
      //       pointRadius: 6,
      //     },
      //     {
      //       label: 'Second chart',
      //       data: [5, 9, 30, 2, 1, 7],
      //       borderWidth: 1,
      //       pointRadius: 6,
      //     },
      //   ],
      // },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          x: {
            //* HIDES TICKS IN THE X AXIS (TEXT LABELS OF EACH POINT IN THE X AXIS)
            // ticks: {
            //   display: false,
            // },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            align: 'center',
            labels: {
              color: 'oklch(0.5956 0.0381 257.87)',
              boxHeight: 3,
              boxWidth: 12,
            },
          },
          title: {
            text: title,
            display: true,
            position: 'top',
            align: 'center',
            font: {
              weight: 600,
              size: 18,
            },
            color: 'oklch(0.3351 0.0331 260.91)',
          },
        },
      },
    });
  }
}
