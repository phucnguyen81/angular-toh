/**
Content projection gives great flexibility to customize a component.
However, it also comes with great complexity. In practice, it should be used
only when the flexibility far outweighs the cost.
 */
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
