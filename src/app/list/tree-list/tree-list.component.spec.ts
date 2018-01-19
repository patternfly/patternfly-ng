import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  TreeModule
} from 'angular-tree-component';

import { ActionConfig } from '../../action/action-config';
import { ActionModule } from '../../action/action.module';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { TreeListComponent } from './tree-list.component';
import { TreeListConfig } from './tree-list-config';

describe('Tree List component - ', () => {
  let comp: TreeListComponent;
  let fixture: ComponentFixture<TreeListComponent>;

  let actionConfig: ActionConfig;
  let config: TreeListConfig;
  let emptyStateConfig: EmptyStateConfig;
  let items: any[];

  beforeEach(() => {
    items = [{
      expanded: true,
      name: 'root expanded',
      subTitle: 'the root',
      children: [{
        name: 'child1',
        subTitle: 'a good child',
        hasChildren: false
      }, {
        name: 'child2',
        subTitle: 'a bad child',
        hasChildren: false
      }]
    }, {
      expanded: false,
      name: 'root2',
      subTitle: 'the second root',
      children: [{
        name: 'child2.1',
        subTitle: 'new and improved',
        hasChildren: false
      }, {
        name: 'child2.2',
        subTitle: 'new and improved2',
        children: [{
          name: 'subsub',
          subTitle: 'subsub',
          hasChildren: false
        }]
      }]
    }];

    actionConfig = {
      primaryActions: [{
        id: 'action1',
        title: 'Main Action',
        tooltip: 'Start the server'
      }],
      moreActions: [{
        id: 'action2',
        title: 'Secondary Action 1',
        tooltip: 'Do the first thing'
      }, {
        id: 'action3',
        title: 'Secondary Action 2',
        tooltip: 'Do something else'
      }, {
        id: 'action4',
        title: 'Secondary Action 3',
        tooltip: 'Do something special'
      }]
    } as ActionConfig;

    emptyStateConfig = {
      actions: actionConfig,
      iconStyleClass: 'pficon-warning-triangle-o',
      info: 'This is the Empty State component. The goal of a empty state pattern is to provide a good first ' +
        'impression that helps users to achieve their goals. It should be used when a list is empty because no ' +
        'objects exists and you want to guide the user to perform specific actions.',
      helpLink: {
        hypertext: 'EmptyState example',
        text: 'For more information please see the',
        url: '/emptystate'
      },
      title: 'No Items Available'
    } as EmptyStateConfig;

    config = {
      dblClick: false,
      emptyStateConfig: this.emptyStateConfig,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      treeOptions: {
        allowDrag: false,
        isExpandedField: 'expanded'
      }
    } as TreeListConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ActionModule,
        EmptyStateModule,
        FormsModule,
        TreeModule
      ],
      declarations: [TreeListComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TreeListComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        comp.items = items;
        fixture.detectChanges();
      });
  }));

  /**
   * After upgrading from 2.7.0 to 3.2.4, running more than one test generates the following exception.
   *
   * ERROR: '[mobx] Encountered an uncaught exception that was thrown by a reaction or observer
   * component, in: 'Reaction[Autorun@175]'
   *
   * This appears related to:
   * https://angular2-tree.readme.io/v2.2.0/discuss/58b936ad759c201900abfdb5
   *
   * Update:
   * Apparently there are no plans to make angular-tree-component work with PhantomJS
   * See: https://github.com/500tech/angular-tree-component/issues/433
   *
   * "Best to shift to a more modern headless browser and not invest your time in issues with Phantom"
   */

   xit('Should have at least one node', function() {
     let elements = fixture.debugElement.queryAll(By.css('.tree-node'));
     expect(elements.length).toBe(4);
   });
  
   xit('Should have collapsed toggle', function() {
     let elements = fixture.debugElement.queryAll(By.css('.tree-node-collapsed'));
     expect(elements.length).toBe(1);
   });
  
   xit('Should have expanded toggle', function() {
     let elements = fixture.debugElement.queryAll(By.css('.tree-node-expanded'));
     expect(elements.length).toBe(1);
   });
});
