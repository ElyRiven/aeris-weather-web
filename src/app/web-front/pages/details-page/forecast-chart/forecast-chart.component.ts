import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

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
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    );
  }
}
