import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZippyModule } from './zippy';

@Component({
  selector: 'app-content-projection',
  templateUrl: './content-projection.component.html',
  styleUrls: ['./content-projection.component.css'],
  standalone: true,
  imports: [CommonModule, ZippyModule],
})
export class ContentProjectionComponent {
}
