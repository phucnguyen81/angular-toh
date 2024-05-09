import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { environment } from './../environments/environment';
import { APP_CONFIG, DEFAULT_CONFIG } from './app.config';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppAlertComponent } from './app-alert.component';
import { AppAlertService } from './app-alert.service';
import { AppContextService } from './app-context.service';
import { HERO_SERVICE } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail';
import { HeroSearchComponent } from './hero-search.component';
import { HeroJsonBinService } from './hero-jsonbin.service';
import { HeroJsonServerService } from './hero-jsonserver.service';

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
    {
      provide: HERO_SERVICE,
      useClass: environment.production
        ? HeroJsonBinService
        : HeroJsonServerService,
    },
    AppAlertService,
    AppContextService,
    { provide: APP_CONFIG, useValue: DEFAULT_CONFIG },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
