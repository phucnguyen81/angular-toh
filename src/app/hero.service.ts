import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppAlertService } from './app-alert.service';
import { Hero } from './hero';

@Injectable()
export class HeroService {
  private mockUrl = 'http://localhost:3000'
  private mockHeroesUrl = `${this.mockUrl}/heroes`

  constructor(private http: HttpClient, private alert: AppAlertService) { }

  getHeroes(): Observable<Hero[]> {
    return this.alert.handleError(this.http.get<Hero[]>(this.mockHeroesUrl));
  }

  search(term: string): Observable<Hero[]> {
    return this.getHeroes().pipe(map(heroes => heroes.filter(
      hero => hero.name?.toLowerCase().includes(term?.toLowerCase())
    )));
  }

  getHero(id: number): Observable<Hero> {
    return this.alert.handleError(
      this.http.get<Hero>(`${this.mockHeroesUrl}/${id}`)
    );
  }

  delete(hero: Hero) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = `${this.mockHeroesUrl}/${hero.id}`;
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
      this.http.post<Hero>(this.mockHeroesUrl, hero, { headers })
    );
  }

  // Update existing Hero
  private put(hero: Hero) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const url = `${this.mockHeroesUrl}/${hero.id}`;
    return this.alert.handleError(this.http.put<Hero>(url, hero, { headers }));
  }
}
