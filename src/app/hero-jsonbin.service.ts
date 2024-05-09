import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as rx from 'rxjs';
import * as op from 'rxjs/operators';

import { environment } from './../environments/environment';
import { AppAlertService } from './app-alert.service';
import { Hero } from './hero';
import { HeroService } from './hero.service';

// The data schema from JSONBin
interface HeroesData {
  record: {
    heroes: Hero[];
  };
  metadata: {
    id: string;
    private: boolean;
    createdAt: string;
    name: string;
  };
}

@Injectable()
export class HeroJsonBinService implements HeroService {
  private readonly http = inject(HttpClient);
  private readonly alert = inject(AppAlertService);

  readonly loading = signal<boolean>(false);

  readonly apiUrl = 'https://api.jsonbin.io/v3/b/66379709e41b4d34e4ef2295';
  readonly apiHeroesUrl = this.apiUrl;
  readonly apiHeroesLatestUrl = `${this.apiUrl}/latest`;

  getHeroes(): rx.Observable<Hero[]> {
    let getHeroes: rx.Observable<Hero[]> = this.http
      .get<HeroesData>(this.apiHeroesLatestUrl)
      .pipe(rx.map((result: HeroesData) => result?.record?.heroes || []));

    if (!environment.production) {
      // simulate network latency
      getHeroes = getHeroes.pipe(op.delay(1000));
    }

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
    return this.getHeroes().pipe(
      rx.map((heroes: Hero[]) => {
        const hero: Hero | undefined = heroes.find((hero) => hero.id === id);
        if (!hero) {
          throw new Error(`Hero not found: id=${id}`);
        }
        return hero;
      })
    );
  }

  delete(hero: Hero) {
    const deleteHero: rx.Observable<object> = this.getHeroes().pipe(
      rx.switchMap((heroes: Hero[]) => {
        const newHeroes = heroes.filter((h) => h.id !== hero.id);
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http
          .put<HeroesData>(
            this.apiHeroesUrl,
            { heroes: newHeroes },
            { headers }
          )
          .pipe(rx.map(() => ({ status: 'success' })));
      })
    );

    return this.alert.handleError(deleteHero);
  }

  save(hero: Hero): rx.Observable<Hero> {
    const saveHero: rx.Observable<Hero> = this.getHeroes().pipe(
      rx.switchMap((heroes: Hero[]) => {
        if (!hero.id) {
          hero.id = Math.max(...heroes.map((h) => h.id), 0) + 1;
        }

        const newHeroes = heroes.filter((h) => h.id !== hero.id).concat([hero]);

        const headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.http
          .put<HeroesData>(
            this.apiHeroesUrl,
            { heroes: newHeroes },
            { headers }
          )
          .pipe(
            rx.map((result: HeroesData) => result?.record?.heroes || []),
            rx.map((heroes) => {
              const savedHero = heroes.find((h) => h.id === hero.id);
              if (!savedHero) {
                throw new Error(`Hero not found: id=${hero.id}`);
              }
              return savedHero;
            })
          );
      })
    );

    return this.alert.handleError(saveHero);
  }
}
