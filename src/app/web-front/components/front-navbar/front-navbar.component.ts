import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  Component,
  signal,
  HostListener,
  effect,
  linkedSignal,
  input,
  inject,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

import type { UserLocation } from '@front/interfaces/location.interface';
import { GeolocationService } from '@geolocation/services/geolocation.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
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
    trigger('searchAnimation', [
      transition(':enter', [
        style({
          transform: 'translateY(-1000px)',
          filter: 'blur(40px)',
          transformOrigin: '50% 0%',

          opacity: 0,
        }),
        animate(
          '0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
          style({
            transform: 'translateY(0)',
            filter: 'blur(0)',
            transformOrigin: '50% 50%',

            opacity: 1,
          })
        ),
      ]),
      transition(':leave', [
        style({
          transform: 'translateY(0)',
          filter: 'blur(0)',
          transformOrigin: '50% 50%',

          opacity: 1,
        }),
        animate(
          '0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
          style({
            transform: 'translateY(-1000px)',
            filter: 'blur(40px)',
            transformOrigin: '50% 0%',

            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class FrontNavbarComponent {
  #geolocationService = inject(GeolocationService);
  #router = inject(Router);

  public isMenuOpen = signal(false);
  public isSearchOpen = signal(false);

  public inputString = signal<string>('');
  public searchResult = linkedSignal<UserLocation[]>(() =>
    this.#geolocationService.getSearchResult()
  );
  public currentLocation = linkedSignal<UserLocation>(() =>
    this.#geolocationService.getCurrentLocation()
  );

  debounceEffect = effect((onCleanup) => {
    const value = this.inputString();

    const timeout = setTimeout(() => {
      if (!value) return;

      this.onSearch(value);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });

  onSearch(input: string): void {
    this.#geolocationService.setSearchQuery(input);
  }

  onSelection(selected: UserLocation): void {
    this.#geolocationService.setSelectedLocation(selected);

    this.#router.navigate(['/location'], {
      queryParams: {
        query: `${selected.location}-${selected.country}`,
      },
    });
  }

  closeAllMenus(): void {
    if (this.isMenuOpen()) {
      this.isMenuOpen.set(false);
    }

    if (this.isSearchOpen()) {
      this.isSearchOpen.set(false);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.closeAllMenus();
  }
}
