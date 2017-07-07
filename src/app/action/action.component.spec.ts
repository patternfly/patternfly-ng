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

import { Action } from '../action/action';
import { ActionComponent } from './action.component';
import { ActionConfig } from '../action/action-config';

describe('Action component - ', () => {
  let comp: ActionComponent;
  let fixture: ComponentFixture<ActionComponent>;
  let config: ActionConfig;

  beforeEach(() => {
    config = {
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
    } as ActionConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        TooltipModule.forRoot()
      ],
      declarations: [
        ActionComponent
      ],
      providers: [BsDropdownConfig, TooltipConfig]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ActionComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        fixture.detectChanges();
      });
  }));

  it('should have correct number of primary actions', function () {
    let fields = fixture.debugElement.queryAll(By.css('.primary-action'));
    expect(fields.length).toBe(2);
  });

  it('should have correct number of secondary actions', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.secondary-action'));
    expect(fields.length).toBe(6);
  });

  it('should have correct number of separators', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.divider'));
    expect(fields.length).toBe(1);
  });

  it('should correctly disable actions', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let fields = fixture.debugElement.queryAll(By.css('.disabled'));
    expect(fields.length).toBe(1);
  });

  it('should not show more actions menu when there are no more actions', function () {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let menus = fixture.debugElement.queryAll(By.css('.fa-ellipsis-v'));
    expect(menus.length).toBe(1);

    config.moreActions.length = 0;
    fixture.detectChanges();

    menus = fixture.debugElement.queryAll(By.css('.fa-ellipsis-v'));
    expect(menus.length).toBe(0);
  });

  it('should call the action function with the appropriate action when an action is clicked', function (done) {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let primaryActions = fixture.debugElement.queryAll(By.css('.primary-action'));
    let moreActions = fixture.debugElement.queryAll(By.css('.secondary-action'));
    expect(primaryActions.length).toBe(2);
    expect(moreActions.length).toBe(6);

    let action: Action;
    comp.onActionSelect.subscribe((data: Action) => {
      action = data;
      done();
    });

    primaryActions[0].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBe(config.primaryActions[0]);

    moreActions[3].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBe(config.moreActions[3]);
  });

  it('should not call the action function when a disabled action is clicked', function (done) {
    fixture.detectChanges(); // Workaround to fix dropdown tests
    let primaryActions = fixture.debugElement.queryAll(By.css('.primary-action'));
    let moreActions = fixture.debugElement.queryAll(By.css('.secondary-action'));
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
    expect(action).toBe(config.primaryActions[1]);

    config.primaryActions[1].disabled = true;
    fixture.detectChanges();
    action = null;

    primaryActions[1].triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBeNull();
  });
});
