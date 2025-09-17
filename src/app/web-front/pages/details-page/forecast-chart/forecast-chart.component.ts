import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
Chart.defaults.font.family = 'jost';

@Component({
  selector: 'forecast-chart',
  imports: [],
  templateUrl: './forecast-chart.component.html',
})
export class ForecastChartComponent implements AfterViewInit {
  public chartCanvas = viewChild<ElementRef>('forecastChart');

  public chart = signal<Chart | undefined>(undefined);

  ngAfterViewInit(): void {
    this.canvasInit();
  }

  canvasInit() {
    const canvas = this.chartCanvas()?.nativeElement;

    if (!canvas) return;

    this.chart.set(
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
              pointRadius: 6,
            },
          ],
        },
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
              //* HIDES TICKS IN THE X AXIS (TEXT LABELS ON EACH POINT)
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
              text: 'Light Rain',
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
      })
    );
  }
}
