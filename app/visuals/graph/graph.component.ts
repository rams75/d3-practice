// path : visuals/graph/graph.component.ts
import { Component, Input } from '@angular/core';
import { D3Service } from '../../d3/d3.service';

import {ForceDirectedGraph} from '../../d3/models/force-directed-graph';
import {Node} from '../../d3/models/node';

@Component({
  selector: 'graph',
  template: `
    <svg #svg [attr.width]="_options.width" [attr.height]="_options.height" [zoomableOf]="svg">
      <g [zoomableOf]="svg">
        <g [linkVisual]="link" *ngFor="let link of links"
        [mousehoverLink]="link"
        ></g>
        <g [nodeVisual]="node" *ngFor="let node of nodes"
        [draggableNode]="node"
        [mousehoverNode]="node"
        [allNodes]="nodes"
        [allLinks]="links"
      [draggableInGraph]="graph"
      [zoomableOf]="svg"></g>
      </g>
    </svg>
  `,
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  @Input('nodes') nodes;
  @Input('links') links;

  graph: ForceDirectedGraph;

  constructor(private d3Service: D3Service) { }

  ngOnInit() {
    /** Receiving an initialized simulated graph from our custom d3 service */
    this.graph = this.d3Service.getForceDirectedGraph(this.nodes, this.links, this.options);
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options);
  }

  private _options: { width, height } = { width: 800, height: 600 };

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }
}