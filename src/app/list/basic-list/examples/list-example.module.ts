import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ActionModule } from '../../../action/action.module';
import { BasicContentComponent } from './basic-content.component';
import { ClustersContentComponent } from './clusters-content.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { HostsContentComponent } from './hosts-content.component';
import { ImagesContentComponent } from './images-content.component';
import { ListModule } from '../../list.module';
import { ListBasicExampleComponent } from './list-basic-example.component';
import { ListCompoundExampleComponent } from './list-compound-example.component';
import { ListHeadingExampleComponent } from './list-heading-example.component';
import { ListExampleComponent } from './list-example.component';
import { NodesContentComponent } from './nodes-content.component';

@NgModule({
  declarations: [
    BasicContentComponent,
    ClustersContentComponent,
    HostsContentComponent,
    ImagesContentComponent,
    ListBasicExampleComponent,
    ListCompoundExampleComponent,
    ListHeadingExampleComponent,
    ListExampleComponent,
    NodesContentComponent
  ],
  imports: [
    ActionModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    ListModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [BsDropdownConfig, TabsetConfig, TooltipConfig]
})
export class ListExampleModule {
  constructor() {}
}
