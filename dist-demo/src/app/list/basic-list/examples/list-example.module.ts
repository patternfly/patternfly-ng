import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { ActionModule } from '../../../action/action.module';
import { BasicContentComponent } from './content/basic-content.component';
import { ClustersContentComponent } from './content/clusters-content.component';
import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { HostsContentComponent } from './content/hosts-content.component';
import { ImagesContentComponent } from './content/images-content.component';
import { ListModule } from '../../list.module';
import { ListBasicExampleComponent } from './list-basic-example.component';
import { ListCompoundExampleComponent } from './list-compound-example.component';
import { ListHeadingExampleComponent } from './list-heading-example.component';
import { ListExampleComponent } from './list-example.component';
import { ListPinExampleComponent } from './list-pin-example.component';
import { NodesContentComponent } from './content/nodes-content.component';
import { PipeModule } from '../../../pipe/pipe.module';

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
    ListPinExampleComponent,
    NodesContentComponent
  ],
  imports: [
    ActionModule,
    BsDropdownModule.forRoot(),
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    ListModule,
    PipeModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [BsDropdownConfig, TabsetConfig, TooltipConfig]
})
export class ListExampleModule {
  constructor() {}
}
