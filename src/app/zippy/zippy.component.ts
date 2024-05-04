import {
  Component,
  Directive,
  Input,
  TemplateRef,
  ContentChild,
  HostBinding,
  HostListener,
  inject,
} from '@angular/core';

@Directive({
  // bind this directive to every button with appZippyToggle attribute
  selector: 'button[appZippyToggle]',
})
export class ZippyToggleDirective {
  // inject the zippy component nearest to the button
  private readonly zippy = inject(ZippyComponent);

  @HostBinding('attr.aria-expanded') ariaExpanded = this.zippy.expanded;
  @HostBinding('attr.aria-controls') ariaControls = this.zippy.contentId;

  // clicking the button expands/collapes the zippy component
  @HostListener('click') toggleZippy() {
    this.zippy.expanded = !this.zippy.expanded;
  }
}

let nextId = 0;

@Directive({
  selector: '[appZippyContent]',
})
export class ZippyContentDirective {
  constructor(public templateRef: TemplateRef<unknown>) { }
}

@Component({
  selector: 'app-zippy',
  templateUrl: './zippy.component.html',
})
export class ZippyComponent {
  contentId = `zippy-${nextId++}`;

  @Input() expanded = false;

  @ContentChild(ZippyContentDirective) content!: ZippyContentDirective;
}
