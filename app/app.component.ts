import { Component } from '@angular/core';
import APP_CONFIG from './app.config';
import { Node } from './d3/models/node';
import { Link } from './d3/models/link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() {
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for(let i=0; i<this.nodes.length; i++) {
      let node = this.nodes[i];
      this.nodes[i] = node;
    }

    for (let i = 1; i < N; i++) {
      for (let m = 2; i * m < N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        //this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        let link = new Link(i, i * m);
         this.links.push(link);
      }
    }
    console.log('nodes are ', this.nodes);
    console.log('links are ', this.links);
  }
}