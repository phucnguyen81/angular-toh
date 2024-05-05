import { Component, inject } from '@angular/core';

import { AppConfig, APP_CONFIG } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Inject an AppConfig implementation by searching for the APP_CONFIG token.
  // Note that since AppConfig is an interface it can not be used as lookup key
  // at runtime
  private readonly appConfig = inject<AppConfig>(APP_CONFIG);

  readonly title = this.appConfig.title;
}
