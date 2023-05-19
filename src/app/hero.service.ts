import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as rx from 'rxjs';
import * as op from 'rxjs/operators';

import { environment } from './../environments/environment';
import { AppAlertService } from './app-alert.service';
import { Hero } from './hero';


@Injectable()
export class HeroService {

  readonly apiUrl = environment.apiUrl;
  readonly apiHeroesUrl = `${this.apiUrl}/heroes`;

  constructor(private http: HttpClient, private alert: AppAlertService) { }

  getHeroes(): rx.Observable<Hero[]> {
    return this.alert.handleError(
      rx.defer(() => {
        this.alert.open('Loading heroes...');  // show loading message
        return this.http.get<Hero[]>(this.apiHeroesUrl);
      }).pipe(
        op.finalize(() => setTimeout(
          () => { this.alert.close(); }  // close loading message on completion
          , 500  // open at least a bit before closing
        ))
      )
    )
  }

  search(term: string): rx.Observable<Hero[]> {
    return this.getHeroes().pipe(op.map(heroes => heroes.filter(
      hero => hero.name?.toLowerCase().includes(term?.toLowerCase())
    )));
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
      'Content-Type': 'application/json'
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
