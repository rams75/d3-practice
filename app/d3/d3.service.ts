// path : d3/d3.service.ts
import { Injectable } from '@angular/core';
import * as d3 from 'd3';

import { ForceDirectedGraph } from './models/force-directed-graph';

import {Link} from './models/link';
import {Node} from './models/node';

@Injectable()
export class D3Service {
    /** This service will provide methods to enable user interaction with elements
    * while maintaining the d3 simulations physics
    */
    constructor() {}
    node: string;
    static elements:any[] = [];
    static links:any[] = [];

    /** A method to bind a pan and zoom behaviour to an svg element */
    applyZoomableBehaviour(svgElement, containerElement) {
        let svg, container, zoomed, zoom;      

        svg = d3.select(svgElement);
        container = d3.select(containerElement);
    
        zoomed = () => {
          const transform = d3.event.transform;
          container.attr("transform", "translate(" + transform.x + "," + transform.y + ") scale(" + transform.k + ")");
        }
    
        zoom = d3.zoom().on("zoom", zoomed);
        svg.call(zoom);
      }

    /** A method to bind a draggable behaviour to an svg element */
    applyDraggableBehaviour(element, node: Node, graph: ForceDirectedGraph) {
        const d3element = d3.select(element);

        function started() {
          
          /** Preventing propagation of dragstart to parent elements */
          d3.event.sourceEvent.stopPropagation();
          

          if (!d3.event.active) {
            graph.simulation.alphaTarget(0.3).restart();
          }


    
          d3.event.on("drag", dragged).on("end", ended);
    
          function dragged() {
            node.fx = d3.event.x;
            node.fy = d3.event.y;
          }
    
          function ended() {
            if (!d3.event.active) {
              graph.simulation.alphaTarget(0);
            }
    
            node.fx = null;
            node.fy = null;
          }
        }
    
        d3element.call(d3.drag()
          .on("start", started));
      }
    

    /** The interactable gr  aph we will simulate in this article
    * This method does not interact with the document, purely physical calculations with d3
    */
    getForceDirectedGraph(nodes: Node[], links: Link[], options: { width, height} ) {
        let graph = new ForceDirectedGraph(nodes, links, options);
        
        return graph;
    }

    applyMouseHoverBehavior(element, node: Node, graph: ForceDirectedGraph,
            nodes: Node[], links: Link[]) {
      
              var svg =  d3.select("body")
              .append("svg");
      console.log('svg ', svg);
      
              svg.append("svg:defs").append("svg:marker")
                                    .attr("id", "triangle")
                                    .attr("refX", 50)
                                    .attr("refY", 6)
                                    .attr("markerWidth", 30)
                                    .attr("markerHeight", 30)
                                    .attr("markerUnits","userSpaceOnUse")
                                    .attr("orient", "auto")
                                    .append("path")
                                    .attr("d", "M 0 0 12 6 0 12 3 6")
                                    .style("fill", "rgb(255, 41, 255)");
    

              const d3element = d3.select(element);
              D3Service.elements.push(d3element);
      
              function started() {

                const highlightIndices = [];
                const highlightLinks = [];
                for(let i=0; i<links.length; i++) {
                  if(links[i].source.id == node.id) {
                      highlightIndices.push(+links[i].target.id-1);
                      highlightLinks.push(i);
                  }
                  if(links[i].target.id == node.id) {
                    highlightIndices.push(+links[i].source.id-1);
                    highlightLinks.push(i);
                  }
                }
                console.log('d3element ', d3element);
                d3element.select('circle').transition().attr('r', 2);

                for(let j=0; j<highlightIndices.length; j++) {
                  D3Service.elements[highlightIndices[j]]
                      .select('circle')
                      .transition().attr('r', 8);
                }

                console.log(highlightLinks);
                for(let k=0; k<highlightLinks.length; k++) {
                  D3Service.links[highlightLinks[k]]
                      .select('line')
                      .transition()
                        .attr('class', 'line2')
                        .attr("marker-end", "url(#triangle)");

                        

                }
                //D3Service.elements[3].select('circle').transition().attr('r', 40); 
              }
              function moved() {
                const highlightIndices = [];
                const highlightLinks = [];
                for(let i=0; i<links.length; i++) {
                  if(links[i].source.id == node.id) {
                      highlightIndices.push(+links[i].target.id-1);
                      highlightLinks.push(i);
                  }
                  if(links[i].target.id == node.id) {
                    highlightIndices.push(+links[i].source.id-1);
                    highlightLinks.push(i);
                  }
                }
                d3element.select('circle').transition().attr('r', 2);

                for(let j=0; j<highlightIndices.length; j++) {
                  D3Service.elements[highlightIndices[j]]
                      .select('circle')
                      .transition().attr('r', 2); 
                }

                for(let k=0; k<highlightLinks.length; k++) {
                  D3Service.links[highlightLinks[k]]
                      .select('line')
                      .transition().attr('class', 'line')
                      .attr('marker-end','');

                }
                
                    
              }
              d3element.on("mouseover", started).on('mouseout', moved);
      
    }

    applyMouseHoverLinkBehavior(element, link: Link, graph: ForceDirectedGraph) {
        const d3element = d3.select(element);
        D3Service.links.push(d3element);
       
      /*function started() {
        console.log('mouse hovered over line ', d3element);
        d3element.select('line')
        .transition().attr('class', 'line2');
      }


        d3element.on("mouseover", started);*/
    }

}
