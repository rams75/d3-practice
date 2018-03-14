// path : d3/directives/draggable.directives.ts
import { Directive, Input, ElementRef } from '@angular/core';
import { ForceDirectedGraph, Link } from '../models';
import { D3Service } from '../d3.service';

@Directive({
    selector: '[mousehoverLink]'
})
export class HoverLinkDirective {
    @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

    @Input('mousehoverLink') mousehoverLink: Link;

    
    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {    
        this.d3Service.applyMouseHoverLinkBehavior(this._element.nativeElement, 
            this.mousehoverLink, this.draggableInGraph);
    }
} 