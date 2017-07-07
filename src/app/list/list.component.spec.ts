import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }  from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ActionConfig } from '../action/action-config';
import { EmptyStateConfig } from '../empty-state/empty-state-config';
import { EmptyStateModule } from '../empty-state/empty-state.module';
import { ListComponent } from './list.component';
import { ListConfig } from './list-config';

describe('List component - ', () => {
  let comp: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let actionConfig: ActionConfig;
  let config: ListConfig;
  let emptyStateConfig: EmptyStateConfig;
  let items: any[];

  beforeEach(() => {
    items = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way',
      city: 'Bedrock',
      state: 'Washingstone'
    }, {
      name: 'John Smith',
      address: '415 East Main Street',
      city: 'Norfolk',
      state: 'Virginia',
      rowExpansionDisabled: true
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street',
      city: 'Pittsburgh',
      state: 'Pennsylvania'
    }, {
      name: 'Linda McGovern',
      address: '22 Oak Street',
      city: 'Denver',
      state: 'Colorado'
    }, {
      name: 'Jim Brown',
      address: '72 Bourbon Way',
      city: 'Nashville',
      state: 'Tennessee'
    }, {
      name: 'Holly Nichols',
      address: '21 Jump Street',
      city: 'Hollywood',
      state: 'California'
    }, {
      name: 'Marie Edwards',
      address: '17 Cross Street',
      city: 'Boston',
      state: 'Massachusetts'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street',
      city: 'New York',
      state: 'New York'
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
      emptyStateConfig: emptyStateConfig,
      multiSelect: false,
      selectItems: false,
      selectionMatchProp: 'name',
      showCheckbox: true,
      useExpandingRows: false
    } as ListConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, EmptyStateModule, FormsModule],
      declarations: [ListComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ListComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        comp.items = items;
        fixture.detectChanges();
      });
  }));

  it('should have correct number of rows', () => {
    let elements = fixture.debugElement.queryAll(By.css('.list-pf-item'));
    expect(elements.length).toBe(8);
  });

  it('should show the select checkbox by default', function () {
    let listItems = fixture.debugElement.queryAll(By.css('.list-pf-item'));
    let checkItems = fixture.debugElement.queryAll(By.css('.list-pf-select'));

    expect(checkItems.length).toBe(items.length);

    // allow item selection
    config.selectItems = false;
    fixture.detectChanges();

    listItems[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    let selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(0);
  });

  it('should not show the select checkboxes when showCheckbox is false', function () {
    let checkItems = fixture.debugElement.queryAll(By.css('.list-pf-select'));

    expect(checkItems.length).toBe(items.length);

    // disallow checkbox selection
    config.showCheckbox = false;
    fixture.detectChanges();

    checkItems = fixture.debugElement.queryAll(By.css('.list-pf-select'));
    expect(checkItems.length).toBe(0);
  });

  it('should not allow selection when selectItems is false', function () {
    let listItems = fixture.debugElement.queryAll(By.css('.list-pf-item'));
    let selectedItems = fixture.debugElement.queryAll(By.css('.active'));

    expect(selectedItems.length).toBe(0);

    // allow item selection
    config.selectItems = false;
    fixture.detectChanges();

    listItems[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(0);
  });

  it('should add active class to clicked list item', function () {
    let listItems = fixture.debugElement.queryAll(By.css('.pfng-list-content'));
    let selectedItems = fixture.debugElement.queryAll(By.css('.active'));

    expect(selectedItems.length).toBe(0);

    // allow item selection
    config.selectItems = true;
    config.showCheckbox = false;
    fixture.detectChanges();

    listItems[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(1);
  });

  it('should manage selected array', function () {
    let listItems = fixture.debugElement.queryAll(By.css('.pfng-list-content'));
    let selectedItems = fixture.debugElement.queryAll(By.css('.active'));

    expect(config.selectedItems.length).toBe(0);

    // allow item selection
    config.selectItems = true;
    config.showCheckbox = false;
    fixture.detectChanges();

    listItems[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(1);
    expect(config.selectedItems.length).toBe(1);
  });

  it('should respect the multiSelect setting', function () {
    let listItems = fixture.debugElement.queryAll(By.css('.pfng-list-content'));
    let selectedItems = fixture.debugElement.queryAll(By.css('.active'));

    expect(selectedItems.length).toBe(0);

    // allow item selection
    config.selectItems = true;
    config.showCheckbox = false;
    config.multiSelect = false;
    fixture.detectChanges();

    listItems[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(1);

    listItems[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(1);

    config.multiSelect = true;
    fixture.detectChanges();

    listItems[3].triggerEventHandler('click', {});
    fixture.detectChanges();

    selectedItems = fixture.debugElement.queryAll(By.css('.active'));
    expect(selectedItems.length).toBe(2);
  });

  it('should not allow both row and checkbox selection', function () {
    let exceptionRaised = false;
    let badConfig = {
      selectItems: true,
      showSelectBox: true
    };

    try {
      comp.config = badConfig;
      fixture.detectChanges();
    } catch (e) {
      exceptionRaised = true;
    }
    expect(exceptionRaised).toBe(true);
  });

  it('should allow expand items', function () {
    config.useExpandItems = true;
    fixture.detectChanges();

    let listItems = fixture.debugElement.queryAll(By.css('.list-pf-chevron .fa-angle-right'));
    expect(items.length).toBe(8);

    listItems[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    let openItem = fixture.debugElement.queryAll(By.css('.list-pf-chevron .fa-angle-right.fa-angle-down'));
    expect(openItem.length).toBe(1);
  });

  it('should show the empty state when specified', function () {
    comp.items = [];
    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('#title'));
    expect(title.nativeElement.textContent.trim().slice(0, 'No Items Available'.length)).toBe('No Items Available');
  });
});
