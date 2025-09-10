import { Component, signal } from '@angular/core';
import { TitleSectionComponent } from './title-section/title-section.component';

@Component({
  selector: 'forecast-page',
  imports: [TitleSectionComponent],
  templateUrl: './forecast-page.component.html',
})
export class ForecastPageComponent {}
