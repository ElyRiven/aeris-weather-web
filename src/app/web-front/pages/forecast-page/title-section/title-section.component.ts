import { Component, signal } from '@angular/core';
import { TemperatureSelectorComponent } from '@shared/components/temperature-selector/temperature-selector.component';

@Component({
  selector: 'title-section',
  imports: [TemperatureSelectorComponent],
  templateUrl: './title-section.component.html',
})
export class TitleSectionComponent {}
