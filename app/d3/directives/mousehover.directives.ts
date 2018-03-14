// path : d3/directives/draggable.directives.ts
import { Directive, Input, ElementRef } from '@angular/core';
import { Node, ForceDirectedGraph, Link } from '../models';
import { D3Service } from '../d3.service';

@Directive({
    selector: '[mousehoverNode]'
})
export class HoverDirective {
    @Input('mousehoverNode') mousehoverNode: Node;
    @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

    @Input('allNodes') nodes: Node[];
    @Input('allLinks') links: Link[];
    
    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyMouseHoverBehavior(this._element.nativeElement, 
            this.mousehoverNode, this.draggableInGraph,
            this.nodes, this.links);
    }
} 