import { Component, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'front-navbar',
  imports: [],
  templateUrl: './front-navbar.component.html',
  animations: [
    trigger('menuAnimation', [
      transition(':enter', [
        style({
          transform: 'translateX(1000px) scaleX(2.5) scaleY(0.2)',
          transformOrigin: '0% 50%',
          filter: 'blur(40px)',
          opacity: 0,
        }),
        animate(
          '0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          style({
            transform: 'translateX(0) scaleY(1) scaleX(1)',
            transformOrigin: '50% 50%',
            filter: 'blur(0)',
            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateX(0) scaleY(1) scaleX(1)',
          transformOrigin: '50% 50%',
          filter: 'blur(0)',
          opacity: 1,
        }),
        animate(
          '0.45s cubic-bezier(0.755, 0.05, 0.855, 0.06)',
          style({
            transform: 'translateX(1000px) scaleX(2) scaleY(0.2)',
            transformOrigin: '0% 50%',
            filter: 'blur(40px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class FrontNavbarComponent {
  public isMenuOpen = signal(false);
}
