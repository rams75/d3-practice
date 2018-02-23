import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import {GraphComponent} from './visuals/graph/graph.component';
import {LinkVisualComponent} from './visuals/shared/link-visual.component';
import {NodeVisualComponent} from './visuals/shared/node-visual.component';
import {DraggableDirective} from './d3/directives/draggable.directives';
import {ZoomableDirective} from './d3/directives/zoomable.directive';
import {D3Service} from './d3/d3.service';
import { D3_DIRECTIVES } from './d3';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SHARED_VISUALS } from './visuals/shared';

@NgModule({
  declarations: [
    AppComponent,GraphComponent,LinkVisualComponent,NodeVisualComponent,
    DraggableDirective,ZoomableDirective,SHARED_VISUALS,
    D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
