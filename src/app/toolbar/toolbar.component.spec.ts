import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { Action } from '../models/action';
import { ActionsConfig } from '../models/actions-config';
import { Filter } from '../filters/filter';
import { FilterConfig } from '../filters/filter-config';
import { FilterField } from '../filters/filter-field';
import { FilterFieldsComponent } from '../filters/filter-fields.component';
import { FilterResultsComponent } from '../filters/filter-results.component';
import { SearchHighlightModule } from './../pipes/search-highlight.module';
import { SortComponent } from '../sort/sort.component';
import { SortConfig } from '../sort/sort-config';
import { SortEvent } from '../sort/sort-event';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarConfig } from './toolbar-config';
import { View } from '../models/view';
import { ViewsConfig } from '../models/views-config';

describe('Toolbar component - ', () => {
  let comp: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let config: ToolbarConfig;

  beforeEach(() => {
    config = {
      actionsConfig: {
        primaryActions: [{
          id: 'action1',
          name: 'Action 1',
          title: 'Do the first thing'
        }, {
          id: 'action2',
          name: 'Action 2',
          title: 'Do something else'
        }],
        moreActions: [{
          id: 'moreActions1',
          name: 'Action',
          title: 'Perform an action'
        }, {
          id: 'moreActions2',
          name: 'Another Action',
          title: 'Do something else'
        }, {
          disabled: true,
          id: 'moreActions3',
          name: 'Disabled Action',
          title: 'Unavailable action',
        }, {
          id: 'moreActions4',
          name: 'Something Else',
          title: ''
        }, {
          id: 'moreActions5',
          name: '',
          separator: true
        }, {
          id: 'moreActions6',
          name: 'Grouped Action 1',
          title: 'Do something'
        }, {
          id: 'moreActions7',
          name: 'Grouped Action 2',
          title: 'Do something similar'
        }]
      } as ActionsConfig,

      filterConfig: {
        fields: [{
          id: 'name',
          title:  'Name',
          placeholder: 'Filter by Name...',
          type: 'text'
        }, {
          id: 'age',
          title:  'Age',
          placeholder: 'Filter by Age...',
          type: 'text'
        }, {
          id: 'address',
          title:  'Address',
          placeholder: 'Filter by Address...',
          type: 'text'
        }, {
          id: 'birthMonth',
          title:  'Birth Month',
          placeholder: 'Filter by Birth Month...',
          type: 'select',
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
          },{
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
      } as FilterConfig,

      sortConfig: {
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
      } as SortConfig,

      viewsConfig: {
        views: [{
          id: 'listView',
          title: 'List View',
          iconClass: 'fa fa-th-list'
        }, {
          id: 'tableView',
          title: 'Table View',
          iconClass: 'fa fa-table'
        }],
      } as ViewsConfig
    } as ToolbarConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        TooltipModule.forRoot(),
        SearchHighlightModule
      ],
      declarations: [
        ToolbarComponent, FilterFieldsComponent,
        FilterResultsComponent, SortComponent
      ],
      providers: [BsDropdownConfig, TooltipConfig]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        fixture.detectChanges();
      });
  }));

  // Filter tests

  it('should have correct number of filter fields', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.filter-field'));
    expect(fields.length).toBe(4);
  });

  it('should have correct number of results', function () {
    let results = fixture.debugElement.query(By.css('h5'));
    expect(results).toBeNull();

    config.filterConfig.appliedFilters = [{
      field: {
        id: 'address',
        title: 'Address'
      },
      value: 'New York'
    }] as Filter[];
    config.filterConfig.resultsCount = 10;
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('h5'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, '10 Results'.length)).toBe('10 Results');
  });

  it ('should add a dropdown select when a select type is chosen', function() {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let filterSelect = fixture.debugElement.query(By.css('.filter-select'));
    let fields = fixture.debugElement.queryAll(By.css('.filter-field'));

    expect(filterSelect).toBeNull();
    fields[3].triggerEventHandler('click', {});
    fixture.detectChanges();

    filterSelect = fixture.debugElement.query(By.css('.filter-select'));
    expect(filterSelect).not.toBeNull();

    /* Todo: ngx-bootstrap no longer renders children for this test?
    let items = filterSelect.queryAll(By.css('li'));
    expect(items.length).toBe(config.filterConfig.fields[3].queries.length + 1); // +1 for the null value
    */
  });

  it ('should clear a filter when the close button is clicked', function () {
    let closeButtons = fixture.debugElement.queryAll(By.css('.pficon-close'));
    expect(closeButtons.length).toBe(0);

    config.filterConfig.appliedFilters = [{
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

  it ('should clear all filters when the clear all filters button is clicked', function () {
    let activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    let clearButton = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(0);
    expect(clearButton).toBeNull();

    config.filterConfig.appliedFilters = [{
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

  it ('should not show filters when a filter config is not supplied', function () {
    let filter = fixture.debugElement.queryAll(By.css('.filter-pf'));
    expect(filter.length).toBe(1);

    config.filterConfig = undefined;
    comp.config = config;
    fixture.detectChanges();

    filter = fixture.debugElement.queryAll(By.css('.filter-pf'));
    expect(filter.length).toBe(0);
  });

  // Sort Tests

  it('should have correct number of sort fields', () => {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let elements = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));
    expect(elements.length).toBe(4);
  });

  it('should have default to the first sort field', () => {
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
  });

  it('should default to ascending sort', function () {
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));
    expect(sortIcon).not.toBeNull();
  });

  it('should update the current sort when one is selected', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    let fields = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));

    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
    expect(fields.length).toBe(4);

    fields[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    expect(results.nativeElement.textContent.trim().slice(0, 'Address'.length))
        .toBe('Address');
  });

  it('should update the direction icon when the sort type changes', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    let fields = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));

    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
    expect(fields.length).toBe(4);
    expect(sortIcon).not.toBeNull();

    fields[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-numeric-asc'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Age'.length)).toBe('Age');
    expect(sortIcon).not.toBeNull();

  });

  it('should reverse the sort direction when the direction button is clicked', function () {
    let sortButton = fixture.debugElement.query(By.css('.sort-pf .btn.btn-link'));
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));
    expect(sortButton).not.toBeNull();
    expect(sortIcon).not.toBeNull();

    sortButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-desc'));
    expect(sortIcon).not.toBeNull();
  });

  it ('should notify when a new sort field is chosen', function(done) {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));

    comp.onSortChange.subscribe((data: SortEvent) => {
      expect(data.field).toBe(config.sortConfig.fields[1]);
      done();
    });

    expect(fields.length).toBe(4);

    fields[1].triggerEventHandler('click', {});
    fixture.detectChanges();
  });

  it ('should notify when the sort direction changes', function(done) {
    let sortButton = fixture.debugElement.query(By.css('.sort-pf .btn.btn-link'));

    comp.onSortChange.subscribe((data: SortEvent) => {
      expect(data.isAscending).toBe(false);
      done();
    });

    expect(sortButton).not.toBeNull();

    sortButton.triggerEventHandler('click', {});
    fixture.detectChanges();
  });

  it ('should not show sort when a sort config is not supplied', function () {
    let sort = fixture.debugElement.query(By.css('.sort-pf'));
    expect(sort).not.toBeNull();

    config.sortConfig = undefined;
    comp.config = config;
    fixture.detectChanges();

    sort = fixture.debugElement.query(By.css('.sort-pf'));
    expect(sort).toBeNull();
  });

  // View tests

  it ('should show the correct view selection buttons', function () {
    let listSelectora = fixture.debugElement.queryAll(By.css('.toolbar-pf-view-selector .btn-link'));
    expect(listSelectora.length).toBe(2);

    expect(fixture.debugElement.query(By.css('.fa-th-list'))).not.toBeNull();
    expect(fixture.debugElement.query(By.css('.fa-table'))).not.toBeNull();
  });

  it ('should show the currently selected view', function () {
    let viewSelector = fixture.debugElement.query(By.css('.toolbar-pf-view-selector'));
    let active = fixture.debugElement.queryAll(By.css('.active'));
    expect(viewSelector).not.toBeNull();
    expect(active.length).toBe(1);

    config.viewsConfig.currentView = config.viewsConfig.views[0];
    fixture.detectChanges();

    active = fixture.debugElement.queryAll(By.css('.active'));
    expect(active.length).toBe(1);
  });

  it ('should update the currently selected view when a view selector clicked', function () {
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

  it ('should call the callback function when a view selector clicked', function (done) {
    let listSelectors = fixture.debugElement.queryAll(By.css('.toolbar-pf-view-selector .btn-link'));
    expect(listSelectors.length).toBe(2);

    let view: View;
    comp.onViewSelect.subscribe((data: View) => {
      view = data;
      done();
    });

    listSelectors[0].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(view).not.toBeNull();
  });

  it ('should not show view selectors when no viewsConfig is supplied', function () {
    let viewSelector = fixture.debugElement.query(By.css('.toolbar-pf-view-selector'));
    expect(viewSelector).not.toBeNull();

    config.viewsConfig = undefined;
    fixture.detectChanges();

    viewSelector = fixture.debugElement.query(By.css('.toolbar-pf-view-selector'));
    expect(viewSelector).toBeNull();
  });

  // Action tests

  it('should have correct number of primary actions', function () {
    let fields = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .primary-action'));
    expect(fields.length).toBe(2);
  });

  it('should have correct number of secondary actions', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .secondary-action'));
    expect(fields.length).toBe(6);
  });

  it('should have correct number of separators', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .divider'));
    expect(fields.length).toBe(1);
  });

  it('should correctly disable actions', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .disabled'));
    expect(fields.length).toBe(1);
  });

  it('should not show more actions menu when there are no more actions', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let menus = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .fa-ellipsis-v'));
    expect(menus.length).toBe(1);

    config.actionsConfig.moreActions.length = 0;
    fixture.detectChanges();

    menus = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .fa-ellipsis-v'));
    expect(menus.length).toBe(0);
  });

  it('should call the action function with the appropriate action when an action is clicked', function (done) {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let primaryActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .primary-action'));
    let moreActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .secondary-action'));
    expect(primaryActions.length).toBe(2);
    expect(moreActions.length).toBe(6);

    let action: Action;
    comp.onActionSelect.subscribe((data: Action) => {
      action = data;
      done();
    });

    primaryActions[0].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBe(config.actionsConfig.primaryActions[0]);

    moreActions[3].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBe(config.actionsConfig.moreActions[3]);
  });

  it('should not call the action function when a disabled action is clicked', function (done) {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let primaryActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .primary-action'));
    let moreActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .secondary-action'));
    expect(primaryActions.length).toBe(2);
    expect(moreActions.length).toBe(6);

    let action: Action = null;
    comp.onActionSelect.subscribe((data: Action) => {
      action = data;
      done();
    });

    moreActions[2].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBeNull();

    primaryActions[1].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBe(config.actionsConfig.primaryActions[1]);

    config.actionsConfig.primaryActions[1].disabled = true;
    fixture.detectChanges();
    action = null;

    primaryActions[1].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBeNull();
  });

  it('should not show action components when an action config is not supplied', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let primaryActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .primary-action'));
    let moreActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .secondary-action'));
    expect(primaryActions.length).toBe(2);
    expect(moreActions.length).toBe(6);

    config.actionsConfig = undefined;
    comp.config = config;
    fixture.detectChanges();

    primaryActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .primary-action'));
    moreActions = fixture.debugElement.queryAll(By.css('.toolbar-pf-actions .secondary-action'));
    expect(primaryActions.length).toBe(0);
    expect(moreActions.length).toBe(0);
  });
});
