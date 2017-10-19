import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TreeModule } from 'angular-tree-component';
import { TabsetConfig, TabsModule } from 'ngx-bootstrap/tabs';

import { DemoComponentsModule } from '../../../../demo/components/demo-components.module';
import { ActionModule } from '../../../action/action.module';
import { ListModule } from '../../list.module';
import { TreeListBasicExampleComponent } from './tree-list-basic-example.component';
import { TreeListDndExampleComponent } from './tree-list-dnd-example.component';
import { TreeListExampleComponent } from './tree-list-example.component';

@NgModule({
  declarations: [TreeListBasicExampleComponent, TreeListDndExampleComponent, TreeListExampleComponent],
  imports: [
    ActionModule,
    CommonModule,
    DemoComponentsModule,
    FormsModule,
    TabsModule.forRoot(),
    ListModule,
    TreeModule
  ],
  providers: [TabsetConfig]
})
export class TreeListExampleModule {
  constructor() {}
}
