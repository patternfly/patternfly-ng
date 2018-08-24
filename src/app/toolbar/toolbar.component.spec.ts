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
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipConfig, TooltipModule } from 'ngx-bootstrap/tooltip';

import { Action } from '../action/action';
import { ActionConfig } from '../action/action-config';
import { ActionModule } from '../action/action.module';
import { Filter } from '../filter/filter';
import { FilterConfig } from '../filter/filter-config';
import { FilterField } from '../filter/filter-field';
import { FilterFieldsComponent } from '../filter/filter-fields.component';
import { FilterResultsComponent } from '../filter/filter-results.component';
import { FilterType } from '../filter/filter-type';
import { SearchHighlightPipeModule } from '../pipe/search-highlight/search-highlight.pipe.module';
import { SortComponent } from '../sort/sort.component';
import { SortConfig } from '../sort/sort-config';
import { SortEvent } from '../sort/sort-event';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarConfig } from './toolbar-config';
import { ToolbarView } from './toolbar-view';
import { TruncatePipeModule } from '../pipe/truncate/truncate.pipe.module';

describe('Toolbar component - ', () => {
  let comp: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let config: ToolbarConfig;

  beforeEach(() => {
    config = {
      actionConfig: {
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
          tooltip: ''
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
      } as ActionConfig,

      filterConfig: {
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
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ActionModule,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        PopoverModule.forRoot(),
        SearchHighlightPipeModule,
        TooltipModule.forRoot(),
        TruncatePipeModule
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
    expect(
      results.nativeElement.textContent.trim().slice(0, '10 Results'.length)
    ).toBe('10 Results');
  });

  it('should show active filters and clear filters button when there are filters', function() {
    let activeFilters = fixture.debugElement.queryAll(By.css('.active-filter'));
    let clearFilters = fixture.debugElement.query(By.css('.clear-filters'));
    expect(activeFilters.length).toBe(0);
    expect(clearFilters).toBeNull();

    config.filterConfig.appliedFilters = [{
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
    expect(items.length).toBe(config.filterConfig.fields[3].queries.length);
  }));

  it('should clear a filter when the close button is clicked', function() {
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

  it('should clear all filters when the clear all filters button is clicked', function() {
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

  it('should not show filters when a filter config is not supplied', function() {
    let filter = fixture.debugElement.queryAll(By.css('.filter-pf'));
    expect(filter.length).toBe(1);

    config.filterConfig = undefined;
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
      expect(data.field).toBe(config.sortConfig.fields[1]);
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

    config.sortConfig = undefined;
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

    config.view = config.views[0];
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

    config.actionConfig.moreActions.length = 0;
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
      expect(action).toBe(config.actionConfig.primaryActions[0]);

      moreActions[3].click();
      fixture.detectChanges();
      expect(action).toBe(config.actionConfig.moreActions[3]);
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
    expect(action).toBe(config.actionConfig.primaryActions[1]);

    config.actionConfig.primaryActions[1].disabled = true;
    fixture.detectChanges();
    action = null;

    primaryActions[1].click();
    fixture.detectChanges();
    expect(action).toBeNull();
  }));
});
