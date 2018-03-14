// path : visuals/shared/link-visual.component.ts
import { Component, Input } from '@angular/core';
import { Link } from '../../d3/models/link';

@Component({
  selector: '[linkVisual]',
  template: `
  <svg:g >
    <svg:line
        [attr.x1]="link.source.x"
        [attr.y1]="link.source.y"
        [attr.x2]="link.target.x"
        [attr.y2]="link.target.y"
        class="line"
    ></svg:line>
    </svg:g>
  `,
  styleUrls: ['./link-visual.component.css']
})
export class LinkVisualComponent  {
  @Input('linkVisual') link: Link;
}