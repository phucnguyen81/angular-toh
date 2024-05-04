import { Component } from '@angular/core';
import { AppAlertService } from './app-alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.scss'],
})
export class AppAlertComponent {
  constructor(readonly alert: AppAlertService) {}
}
