import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ZippyComponent,
  ZippyContentDirective,
  ZippyToggleDirective,
} from './zippy.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ZippyComponent,
    ZippyToggleDirective,
    ZippyContentDirective,
  ],
  exports: [
    ZippyComponent,
    ZippyToggleDirective,
    ZippyContentDirective,
  ],
})
export class ZippyModule { }
