import { Component, signal } from '@angular/core';
import { TitleSectionComponent } from './title-section/title-section.component';
import { ForecastCardComponent } from './forecast-card/forecast-card.component';

@Component({
  selector: 'forecast-page',
  imports: [TitleSectionComponent, ForecastCardComponent],
  templateUrl: './forecast-page.component.html',
})
export class ForecastPageComponent {}
