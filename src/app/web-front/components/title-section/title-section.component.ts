import { Component, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import type { UserLocation } from '@front/interfaces/location.interface';
import { TemperatureSelectorComponent } from '@shared/components/temperature-selector/temperature-selector.component';

@Component({
  selector: 'title-section',
  imports: [TemperatureSelectorComponent],
  providers: [DatePipe],
  templateUrl: './title-section.component.html',
})
export class TitleSectionComponent {
  constructor(private datePipe: DatePipe) {}

  public currentLocation = input.required<UserLocation>();

  public selectedDate = input<string>('5 days');

  formatDate(date: string, format: string = 'EEEE, d MMMM'): string {
    if (date === '5 days') return date;

    const formattedDate = this.datePipe.transform(date, format);
    return formattedDate || date;
  }
}
