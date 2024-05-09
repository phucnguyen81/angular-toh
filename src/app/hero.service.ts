import { InjectionToken, WritableSignal } from '@angular/core';

import { Observable } from 'rxjs';

import { Hero } from './hero';

export interface HeroService {
  getHero(id: number): Observable<Hero>;

  getHeroes(): Observable<Hero[]>;

  search(term: string): Observable<Hero[]>;

  delete(hero: Hero): Observable<object>;

  save(hero: Hero): Observable<Hero>;

  readonly loading: WritableSignal<boolean>;
}

// since the interface HeroService is not available at runtime,
// we need to use a concrete token
export const HERO_SERVICE = new InjectionToken<HeroService>('hero.service');
