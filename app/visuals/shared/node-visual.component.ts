
// path : visuals/shared/node-visual.component.ts
import { Component, Input } from '@angular/core';
import { Node } from '../../d3/models/node';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          r="2"
          fill="rgb(0, 106, 197)">
      </svg:circle>
      <svg:text _ngcontent-c3="" class="node-name">
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;
}

