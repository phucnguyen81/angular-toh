import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="title">{{title}}</h1>
    <div class="header-bar"></div>
    <app-alert></app-alert>
    <nav>
      <a class="dashboard" routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a class="heroes" routerLink="/heroes" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly title = 'Tour of Heroes';
}
