import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as rx from 'rxjs';
import * as op from 'rxjs/operators';

import { AppAlertService } from './app-alert.service';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Injectable()
export class HeroJsonServerService implements HeroService {
  private readonly http = inject(HttpClient);
  private readonly alert = inject(AppAlertService);

  readonly loading = signal<boolean>(false);

  readonly apiUrl = 'http://localhost:3000';
  readonly apiHeroesUrl = `${this.apiUrl}/heroes`;

  getHeroes(): rx.Observable<Hero[]> {
    const getHeroes: rx.Observable<Hero[]> = this.http
      .get<Hero[]>(this.apiHeroesUrl)
      .pipe(op.delay(1000)); // simulate network latency for local env

    return this.alert.handleError(
      rx
        .defer(() => {
          this.loading.set(true);
          return getHeroes;
        })
        .pipe(op.finalize(() => this.loading.set(false)))
    );
  }

  search(term: string): rx.Observable<Hero[]> {
    return this.getHeroes().pipe(
      op.map((heroes) =>
        heroes.filter((hero) =>
          hero.name?.toLowerCase().includes(term?.toLowerCase())
        )
      )
    );
  }

  getHero(id: number): rx.Observable<Hero> {
    return this.alert.handleError(
      this.http.get<Hero>(`${this.apiHeroesUrl}/${id}`)
    );
  }

  delete(hero: Hero) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = `${this.apiHeroesUrl}/${hero.id}`;
    return this.alert.handleError(this.http.delete<Hero>(url, { headers }));
  }

  save(hero: Hero) {
    return hero.id ? this.put(hero) : this.post(hero);
  }

  // Add new Hero
  private post(hero: Hero) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.alert.handleError(
      this.http.post<Hero>(this.apiHeroesUrl, hero, { headers })
    );
  }

  // Update existing Hero
  private put(hero: Hero) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = `${this.apiHeroesUrl}/${hero.id}`;
    return this.alert.handleError(this.http.put<Hero>(url, hero, { headers }));
  }
}
