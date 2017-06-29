import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { BasicContentComponent } from './basic-content.component';
import { ClustersContentComponent } from './clusters-content.component';
import { DemoComponentsModule } from '../../../demo/components/demo-components.module';
import { HostsContentComponent } from './hosts-content.component';
import { ImagesContentComponent } from './images-content.component';
import { ListViewModule } from '../list-view.module';
import { ListViewBasicExampleComponent } from './list-view-basic-example.component';
import { ListViewCompoundExampleComponent } from './list-view-compound-example.component';
import { ListViewExampleComponent } from './list-view-example.component';
import { NodesContentComponent } from './nodes-content.component';

@NgModule({
  declarations: [
    BasicContentComponent,
    ClustersContentComponent,
    HostsContentComponent,
    ImagesContentComponent,
    ListViewBasicExampleComponent,
    ListViewCompoundExampleComponent,
    ListViewExampleComponent,
    NodesContentComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    ListViewModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [ BsDropdownConfig, TabsetConfig, TooltipConfig ]
})
export class ListViewExampleModule {
  constructor() {}
}
