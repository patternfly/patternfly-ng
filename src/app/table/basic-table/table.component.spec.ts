import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
import { ActionModule } from '../../action/action.module';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { Filter } from '../../filter/filter';
import { FilterConfig } from '../../filter/filter-config';
import { FilterField } from '../../filter/filter-field';
import { FilterType } from '../../filter/filter-type';
import { NgxDataTableDndDirective } from './ngx-datatable-dnd.directive';
import { PipeModule } from './../../pipe/pipe.module';
import { PaginationConfig } from './../../pagination/pagination-config';
import { PaginationModule } from './../../pagination/pagination.module';
import { SortConfig } from '../../sort/sort-config';
import { SortEvent } from '../../sort/sort-event';
import { TableComponent } from './table.component';
import { TableConfig } from './table-config';
import { ToolbarConfig } from './../../toolbar/toolbar-config';
import { ToolbarModule } from './../../toolbar/toolbar.module';
import { ToolbarView } from './../../toolbar/toolbar-view';

describe('Table component - ', () => {
  let comp: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let config: TableConfig;

  let actionConfig: ActionConfig;
  let columns: any[];
  let emptyStateConfig: EmptyStateConfig;
  let filterConfig: FilterConfig;
  let paginationConfig: PaginationConfig;
  let sortConfig: SortConfig;
  let toolbarConfig: ToolbarConfig;
  let rows: any[];

  beforeEach(() => {
    columns = [{
      // cellTemplate: this.nameTemplate,
      draggable: true,
      prop: 'name',
      name: 'Name',
      resizeable: true
    }, {
      // cellTemplate: this.addressTemplate,
      draggable: true,
      prop: 'address',
      name: 'Address',
      resizeable: true
    }, {
      // cellTemplate: this.birthMonthTemplate,
      draggable: true,
      prop: 'birthMonth',
      name: 'Birth Month',
      resizeable: true
    }, {
      // cellTemplate: this.weekDayTemplate,
      draggable: true,
      prop: 'weekDay',
      name: 'Week Day',
      resizeable: true
    }];

    rows = [{
      name: 'Fred Flintstone',
      address: '20 Dinosaur Way, Bedrock, Washingstone',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Sunday',
      weekdayId: 'day1'
    }, {
      name: 'John Smith',
      address: '415 East Main Street, Norfolk, Virginia',
      birthMonth: 'October',
      birthMonthId: '10',
      // selected: true,
      weekDay: 'Monday',
      weekdayId: 'day2'
    }, {
      name: 'Frank Livingston',
      address: '234 Elm Street, Pittsburgh, Pennsylvania',
      birthMonth: 'March',
      birthMonthId: 'month3',
      weekDay: 'Tuesday',
      weekdayId: 'day3'
    }, {
      name: 'Judy Green',
      address: '2 Apple Boulevard, Cincinatti, Ohio',
      birthMonth: 'December',
      birthMonthId: 'month12',
      weekDay: 'Wednesday',
      weekdayId: 'day4'
    }, {
      name: 'Pat Thomas',
      address: '50 Second Street, New York, New York',
      birthMonth: 'February',
      birthMonthId: 'month2',
      weekDay: 'Thursday',
      weekdayId: 'day5'
    }];

    actionConfig = {
      primaryActions: [{
        id: 'action1',
        title: 'Action 1',
        tooltip: 'Do the first thing'
      }, {
        id: 'action2',
        title: 'Action 2',
        tooltip: 'Do something else'
      }],
        moreActions: [{
        id: 'moreActions1',
        title: 'Action',
        tooltip: 'Perform an action'
      }, {
        id: 'moreActions2',
        title: 'Another Action',
        tooltip: 'Do something else'
      }, {
        disabled: true,
        id: 'moreActions3',
        title: 'Disabled Action',
        tooltip: 'Unavailable action',
      }, {
        id: 'moreActions4',
        title: 'Something Else',
        tooltip: 'Do something special'
      }, {
        id: 'moreActions5',
        title: '',
        separator: true
      }, {
        id: 'moreActions6',
        title: 'Grouped Action 1',
        tooltip: 'Do something'
      }, {
        id: 'moreActions7',
        title: 'Grouped Action 2',
        tooltip: 'Do something similar'
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

    filterConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        placeholder: 'Filter by Name...',
        type: FilterType.TEXT
      }, {
        id: 'age',
        title: 'Age',
        placeholder: 'Filter by Age...',
        type: FilterType.TEXT
      }, {
        id: 'address',
        title: 'Address',
        placeholder: 'Filter by Address...',
        type: FilterType.TEXT
      }, {
        id: 'birthMonth',
        title: 'Birth Month',
        placeholder: 'Filter by Birth Month...',
        type: FilterType.SELECT,
        queries: [{
          id: 'month1',
          value: 'January'
        }, {
          id: 'month2',
          value: 'February'
        }, {
          id: 'month3',
          value: 'March'
        }, {
          id: 'month4',
          value: 'April'
        }, {
          id: 'month5',
          value: 'May'
        }, {
          id: 'month6',
          value: 'June'
        }, {
          id: 'month7',
          value: 'July'
        }, {
          id: 'month8',
          value: 'August'
        }, {
          id: 'month9',
          value: 'September'
        }, {
          id: 'month10',
          value: 'October'
        }, {
          id: 'month11',
          value: 'November'
        }, {
          id: 'month12',
          value: 'December'
        }]
      }] as FilterField[],
        resultsCount: 5,
        appliedFilters: []
    } as FilterConfig;

    paginationConfig = {
      pageNumber: 1,
      pageSize: 3,
      pageSizeIncrements: [2, 3, 4],
      totalItems: rows.length
    } as PaginationConfig;

    sortConfig = {
      fields: [{
        id: 'name',
        title: 'Name',
        sortType: 'alpha'
      }, {
        id: 'age',
        title: 'Age',
        sortType: 'numeric'
      }, {
        id: 'address',
        title: 'Address',
        sortType: 'alpha'
      }, {
        id: 'birthMonth',
        title: 'Birth Month',
        sortType: 'alpha'
      }],
        isAscending: this.isAscendingSort
    } as SortConfig;

    toolbarConfig = {
      actionConfig: actionConfig,
      filterConfig: filterConfig,
      sortConfig: sortConfig,
      views: [{
        id: 'listView',
        iconStyleClass: 'fa fa-th-list',
        tooltip: 'List View'
      }, {
        id: 'tableView',
        iconStyleClass: 'fa fa-table',
        tooltip: 'Table View'
      }]
    } as ToolbarConfig;

    config = {
      dragEnabled: true,
      emptyStateConfig: emptyStateConfig,
      paginationConfig: paginationConfig,
      showCheckbox: true,
      toolbarConfig: toolbarConfig,
      useExpandRows: true
    } as TableConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ActionModule,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        DragulaModule,
        EmptyStateModule,
        FormsModule,
        PaginationModule,
        PipeModule,
        PopoverModule.forRoot(),
        NgxDatatableModule,
        ToolbarModule,
        TooltipModule.forRoot()
      ],
      declarations: [
        TableComponent,
        NgxDataTableDndDirective
      ],
      providers: [BsDropdownConfig, TooltipConfig, DragulaService]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TableComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        comp.columns = columns;
        comp.rows = rows.slice((paginationConfig.pageNumber - 1) * paginationConfig.pageSize,
          paginationConfig.totalItems).slice(0, paginationConfig.pageSize);
        fixture.detectChanges();
      });
  }));

  it('should have correct number of rows', function() {
    let fields = fixture.debugElement.queryAll(By.css('.datatable-row-wrapper'));
    expect(fields.length).toBe(3);
  });

  it('should show pagination control', function() {
    let results = fixture.debugElement.query(By.css('pfng-pagination'));
    expect(results).not.toBeNull();
  });

  it('should show drag and drop control', function() {
    fixture.detectChanges(); // Workaround to render selection column
    let results = fixture.debugElement.queryAll(By.css('.pfng-table-dnd-header'));
    expect(results.length).not.toBe(0);
  });

  it('should show expand toggle control', function() {
    fixture.detectChanges(); // Workaround to render selection column
    let results = fixture.debugElement.queryAll(By.css('.fa-angle-right'));
    expect(results.length).not.toBe(0);
  });

  it('should show row selection', function() {
    fixture.detectChanges(); // Workaround to render selection column
    let results = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
    expect(results.length).not.toBe(0);
  });

  // Todo: selection column template doesn't render properly to test dnd, checkbox, and expand toggle

  xit('should change expand toggle', () => {
    fixture.detectChanges();
    let expanded = fixture.debugElement.queryAll(By.css('.fa-angle-down'));
    expect(expanded.length).toBe(0);
    let collapsed = fixture.debugElement.queryAll(By.css('.fa-angle-right'));
    collapsed[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    expanded = fixture.debugElement.queryAll(By.css('.fa-angle-down'));
    expect(expanded.length).not.toBe(0);
  });

  // Pagination

  it('should go to next page', () => {
    let button = fixture.debugElement.query(By.css('.goto-next-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.paginationConfig.pageNumber).toEqual(2);
  });

  it('should go to previous page', () => {
    comp.config.paginationConfig.pageNumber = 2;
    let button = fixture.debugElement.query(By.css('.goto-prev-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.paginationConfig.pageNumber).toEqual(1);
  });

  it('should jump to first page', () => {
    comp.config.paginationConfig.pageNumber = 2;
    let button = fixture.debugElement.query(By.css('.goto-first-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.paginationConfig.pageNumber).toEqual(1);
  });

  it('should change page Size', fakeAsync(() => {
    const element = fixture.nativeElement;

    let button = element.querySelector('pfng-pagination button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    // click on menu option with value 20
    let item = element.querySelectorAll(' pfng-pagination ul.dropdown-menu > li > a');
    item[2].click();
    fixture.detectChanges();

    expect(comp.config.paginationConfig.pageSize).toEqual(4);
  }));

  it('should change the page on blur by using input', () => {
    let input = fixture.debugElement.query(By.css('pfng-pagination input.pagination-pf-page'));
    input.nativeElement.value = 2;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('blur', null);
    expect(comp.config.paginationConfig.pageNumber).toBe(2);
  });

  // Filter tests

  it('should have correct number of filter fields', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let fields = element.querySelectorAll('.filter-field');
    expect(fields.length).toBe(4);
  }));

  it('should have correct number of results', function() {
    let results = fixture.debugElement.query(By.css('h5'));
    expect(results).toBeNull();

    config.toolbarConfig.filterConfig.appliedFilters = [{
      field: {
        id: 'address',
        title: 'Address'
      },
      value: 'New York'
    }] as Filter[];
    config.toolbarConfig.filterConfig.resultsCount = 10;
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('h5'));
    expect(results).not.toBeNull();
    expect(
      results.nativeElement.textContent.trim().slice(0, '10 Results'.length)
    ).toBe('10 Results');
  });

  it('should show active filters and clear filters button when there are filters', function() {
    let activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    let clearFilters = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(0);
    expect(clearFilters).toBeNull();

    config.toolbarConfig.filterConfig.appliedFilters = [{
      field: {
        id: 'address',
        title: 'Address'
      },
      value: 'New York'
    }] as Filter[];
    fixture.detectChanges();

    activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    clearFilters = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(1);
    expect(clearFilters).not.toBeNull();
  });

  it('should add a dropdown select when a select type is chosen', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let filterSelect = element.querySelector('.filter-select');
    let fields = element.querySelectorAll('.filter-field');

    expect(filterSelect).toBeNull();
    fields[3].click();
    fixture.detectChanges();

    filterSelect = element.querySelector('.filter-select');
    expect(filterSelect).not.toBeNull();

    let selectButton = element.querySelector('.filter-select button');
    selectButton.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let items = element.querySelectorAll('.filter-select li');
    expect(items.length).toBe(config.toolbarConfig.filterConfig.fields[3].queries.length + 1); // +1 for the null value
  }));

  it('should clear a filter when the close button is clicked', function() {
    let closeButtons = fixture.debugElement.queryAll(By.css('.pficon-close'));
    expect(closeButtons.length).toBe(0);

    config.toolbarConfig.filterConfig.appliedFilters = [{
      field: {
        id: 'address',
        title: 'Address'
      },
      value: 'New York'
    }] as Filter[];
    fixture.detectChanges();

    closeButtons = fixture.debugElement.queryAll(By.css('.pficon-close'));
    expect(closeButtons.length).toBe(1);

    closeButtons[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    closeButtons = fixture.debugElement.queryAll(By.css('.pficon-close'));
    expect(closeButtons.length).toBe(0);
  });

  it('should clear all filters when the clear all filters button is clicked', function() {
    let activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    let clearButton = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(0);
    expect(clearButton).toBeNull();

    config.toolbarConfig.filterConfig.appliedFilters = [{
      field: {
        id: 'address',
        title: 'Address'
      },
      value: 'New York'
    }] as Filter[];
    fixture.detectChanges();

    activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    clearButton = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(1);
    expect(clearButton).not.toBeNull();

    clearButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    clearButton = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(0);
    expect(clearButton).toBeNull();
  });

  it('should not show filters when a filter config is not supplied', function() {
    let filter = fixture.debugElement.queryAll(By.css('.filter-pf'));
    expect(filter.length).toBe(1);

    config.toolbarConfig.filterConfig = undefined;
    comp.config = config;
    fixture.detectChanges();

    filter = fixture.debugElement.queryAll(By.css('.filter-pf'));
    expect(filter.length).toBe(0);
  });

  // Sort Tests

  it('should have correct number of sort fields', fakeAsync(() => {
    const element = fixture.nativeElement;

    let button = element.querySelector('.sort-pf button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let elements = element.querySelectorAll('.sort-pf .sort-field');
    expect(elements.length).toBe(4);
  }));

  it('should have default to the first sort field', () => {
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
  });

  it('should default to ascending sort', function() {
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));
    expect(sortIcon).not.toBeNull();
  });

  it('should update the current sort when one is selected', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.sort-pf button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let results = element.querySelector('.sort-pf .dropdown-toggle');
    let fields = element.querySelectorAll('.sort-pf .sort-field');

    expect(results).not.toBeNull();
    expect(results.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
    expect(fields.length).toBe(4);

    fields[2].click();
    fixture.detectChanges();

    results = element.querySelector('.sort-pf .dropdown-toggle');
    expect(results.textContent.trim().slice(0, 'Address'.length))
      .toBe('Address');
  }));

  it('should update the direction icon when the sort type changes', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.sort-pf button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let results = element.querySelector('.sort-pf .dropdown-toggle');
    let fields = element.querySelectorAll('.sort-pf .sort-field');
    let sortIcon = element.querySelector('.sort-pf .fa-sort-alpha-asc');

    expect(results).not.toBeNull();
    expect(results.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
    expect(fields.length).toBe(4);
    expect(sortIcon).not.toBeNull();

    fields[1].click();
    fixture.detectChanges();

    results = element.querySelector('.sort-pf .dropdown-toggle');
    sortIcon = element.querySelector('.sort-pf .fa-sort-numeric-asc');
    expect(results).not.toBeNull();
    expect(results.textContent.trim().slice(0, 'Age'.length)).toBe('Age');
    expect(sortIcon).not.toBeNull();
  }));

  it('should reverse the sort direction when the direction button is clicked', function() {
    let sortButton = fixture.debugElement.query(By.css('.sort-pf .btn.btn-link'));
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));
    expect(sortButton).not.toBeNull();
    expect(sortIcon).not.toBeNull();

    sortButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-desc'));
    expect(sortIcon).not.toBeNull();
  });

  it('should notify when a new sort field is chosen', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.sort-pf button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let fields = element.querySelectorAll('.sort-pf .sort-field');
    expect(fields.length).toBe(4);

    comp.onSortChange.subscribe((data: SortEvent) => {
      expect(data.field).toBe(config.toolbarConfig.sortConfig.fields[1]);
    });

    fields[1].click();
    fixture.detectChanges();
    tick();
  }));

  it('should notify when the sort direction changes', function(done) {
    let sortButton = fixture.debugElement.query(By.css('.sort-pf .btn.btn-link'));

    comp.onSortChange.subscribe((data: SortEvent) => {
      expect(data.isAscending).toBe(false);
      done();
    });

    expect(sortButton).not.toBeNull();

    sortButton.triggerEventHandler('click', {});
    fixture.detectChanges();
  });

  it('should not show sort when a sort config is not supplied', function() {
    let sort = fixture.debugElement.query(By.css('.sort-pf'));
    expect(sort).not.toBeNull();

    config.toolbarConfig.sortConfig = undefined;
    comp.config = config;
    fixture.detectChanges();

    sort = fixture.debugElement.query(By.css('.sort-pf'));
    expect(sort).toBeNull();
  });

  // View tests

  it('should show the correct view selection buttons', function() {
    let listSelectora = fixture.debugElement.queryAll(By.css('.toolbar-pf-view-selector .btn-link'));
    expect(listSelectora.length).toBe(2);

    expect(fixture.debugElement.query(By.css('.fa-th-list'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.fa-table'))).not.toBeNull();
  });

  it('should show the currently selected view', function() {
    let viewSelector = fixture.debugElement.query(By.css('.toolbar-pf-view-selector'));
    let active = fixture.debugElement.queryAll(By.css('.active'));
    expect(viewSelector).not.toBeNull();
    expect(active.length).toBe(1);

    config.toolbarConfig.view = config.toolbarConfig.views[0];
    fixture.detectChanges();

    active = fixture.debugElement.queryAll(By.css('.active'));
    expect(active.length).toBe(1);
  });

  it('should update the currently selected view when a view selector clicked', function() {
    let active = fixture.debugElement.queryAll(By.css('.active'));
    let viewSelector = fixture.debugElement.query(By.css('.toolbar-pf-view-selector'));
    let listSelectora = fixture.debugElement.queryAll(By.css('.toolbar-pf-view-selector .btn-link'));

    expect(viewSelector).not.toBeNull();
    expect(active.length).toBe(1);
    expect(listSelectora.length).toBe(2);

    listSelectora[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    active = fixture.debugElement.queryAll(By.css('.active'));
    expect(active.length).toBe(1);
  });

  it('should call the callback function when a view selector clicked', function(done) {
    let listSelectors = fixture.debugElement.queryAll(By.css('.toolbar-pf-view-selector .btn-link'));
    expect(listSelectors.length).toBe(2);

    let view: ToolbarView;
    comp.onViewSelect.subscribe((data: ToolbarView) => {
      view = data;
      done();
    });

    listSelectors[0].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(view).not.toBeNull();
  });

  // Action tests

  it('should have correct number of primary actions', function() {
    let fields = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .primary-action'));
    expect(fields.length).toBe(2);
  });

  it('should have correct number of secondary actions', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.toolbar-actions button.dropdown-toggle');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let fields = element.querySelectorAll('.toolbar-actions .secondary-action');
    expect(fields.length).toBe(6);
  }));

  it('should have correct number of separators', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.toolbar-actions button.dropdown-toggle');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let fields = element.querySelectorAll('.toolbar-actions .divider');
    expect(fields.length).toBe(1);
  }));

  it('should correctly disable actions', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.toolbar-actions .dropdown-kebab-pf button.dropdown-toggle');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let fields = element.querySelectorAll('.toolbar-actions .disabled');
    expect(fields.length).toBe(1);
  }));

  it('should not show more actions menu when there are no more actions', function() {
    let menus = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .fa-ellipsis-v'));
    expect(menus.length).toBe(1);

    config.toolbarConfig.actionConfig.moreActions.length = 0;
    fixture.detectChanges();

    menus = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .fa-ellipsis-v'));
    expect(menus.length).toBe(0);
  });

  it('should call the action function with the appropriate action when an action is clicked',
    fakeAsync(function() {
      const element = fixture.nativeElement;

      let button = element.querySelector('.toolbar-pf-actions .dropdown-kebab-pf button');
      button.click();
      tick();
      fixture.detectChanges(); // Workaround to fix dropdown tests

      let moreActions = element.querySelectorAll(
        '.toolbar-pf-actions .dropdown-kebab-pf .dropdown-item.secondary-action');
      expect(moreActions.length).toBe(6);

      let primaryActions = element.querySelectorAll('.toolbar-pf-actions button.primary-action');
      expect(primaryActions.length).toBe(2);

      let action: Action;
      comp.onActionSelect.subscribe((data: Action) => {
        action = data;
      });

      primaryActions[0].click();
      fixture.detectChanges();
      expect(action).toBe(config.toolbarConfig.actionConfig.primaryActions[0]);

      moreActions[3].click();
      fixture.detectChanges();
      expect(action).toBe(config.toolbarConfig.actionConfig.moreActions[3]);
    }));

  it('should not call the action function when a disabled action is clicked', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.toolbar-pf-actions .dropdown-kebab-pf button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let moreActions = element.querySelectorAll(
      '.toolbar-pf-actions .dropdown-kebab-pf .dropdown-item.secondary-action');
    expect(moreActions.length).toBe(6);

    let primaryActions = element.querySelectorAll('.toolbar-pf-actions button.primary-action');
    expect(primaryActions.length).toBe(2);

    let action: Action = null;
    comp.onActionSelect.subscribe((data: Action) => {
      action = data;
    });

    moreActions[2].click();
    fixture.detectChanges();
    expect(action).toBeNull();

    primaryActions[1].click();
    fixture.detectChanges();
    expect(action).toBe(config.toolbarConfig.actionConfig.primaryActions[1]);

    config.toolbarConfig.actionConfig.primaryActions[1].disabled = true;
    fixture.detectChanges();
    action = null;

    primaryActions[1].click();
    fixture.detectChanges();
    expect(action).toBeNull();
  }));
});
