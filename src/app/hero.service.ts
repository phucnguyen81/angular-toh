import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { AppAlertService } from './app-alert.service';
import { Hero } from './hero';

@Injectable()
export class HeroService {

  readonly apiUrl = environment.apiUrl;
  readonly apiHeroesUrl = `${this.apiUrl}/heroes`;

  constructor(private http: HttpClient, private alert: AppAlertService) { }

  getHeroes(): Observable<Hero[]> {
    console.log('getHeroes', this.apiHeroesUrl);
    return this.alert.handleError(this.http.get<Hero[]>(this.apiHeroesUrl));
  }

  search(term: string): Observable<Hero[]> {
    return this.getHeroes().pipe(map(heroes => heroes.filter(
      hero => hero.name?.toLowerCase().includes(term?.toLowerCase())
    )));
  }

  getHero(id: number): Observable<Hero> {
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
