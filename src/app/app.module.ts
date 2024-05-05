import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { APP_CONFIG, DEFAULT_CONFIG } from './app.config';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppAlertComponent } from './app-alert.component';
import { AppAlertService } from './app-alert.service';
import { AppContextService } from './app-context.service';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail';
import { HeroSearchComponent } from './hero-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HeroDetailComponent,
  ],
  declarations: [
    AppComponent,
    AppAlertComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroesComponent,
  ],
  providers: [
    HeroService,
    AppAlertService,
    AppContextService,
    { provide: APP_CONFIG, useValue: DEFAULT_CONFIG },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
