import { Component } from '@angular/core';
import { FrontFooterComponent } from '@front/components/front-footer/front-footer.component';
import { FrontNavbarComponent } from '@front/components/front-navbar/front-navbar.component';

@Component({
  selector: 'app-web-front-layout',
  imports: [FrontNavbarComponent, FrontFooterComponent],
  templateUrl: './web-front-layout.component.html',
})
export class WebFrontLayoutComponent {}
