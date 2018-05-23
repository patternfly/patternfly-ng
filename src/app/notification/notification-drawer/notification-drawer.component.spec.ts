import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ActionConfig } from '../../action/action-config';
import { ActionModule } from '../../action/action.module';
import { EmptyStateConfig } from '../../empty-state/empty-state-config';
import { EmptyStateModule } from '../../empty-state/empty-state.module';
import { NotificationDrawerComponent } from './notification-drawer.component';
import { NotificaitonGroup } from '../notification-group';

describe('notification drawer component - ', () => {
  let comp: NotificationDrawerComponent;
  let fixture: ComponentFixture<NotificationDrawerComponent>;
  let actionConfig: ActionConfig;
  let emptyStateConfig: EmptyStateConfig;
  let groups: NotificaitonGroup[];
  let currentTime: number;
  this.currentTime = (new Date()).getTime();

  beforeEach(async() => {
    actionConfig = {
      moreActions : [{
        title: 'Action',
        tooltip: 'Perform an action'
      }, {
        title: 'Another Action',
        tooltip: 'Do something else'
      }, {
        title: 'Disabled Action',
        tooltip: 'Unavailable action',
        disabled: true
      }, {
        title: 'Something Else',
        tooltip: ''
      }, {
        separator: true
      }, {
        title: 'Grouped Action 1',
        tooltip: 'Do something'
      }, {
        title: 'Grouped Action 2',
        tooltip: 'Do something similar'
      }]
    } as ActionConfig;

    groups = [{
      heading: 'Notification Tab 1',
      subHeading: '5 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold.',
        type: 'info',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'info',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'error',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (12 * 60 * 60 * 1000)
      }, {

        isViewing: true,
        message: 'Another Event Notification',
        type: 'info',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (240 * 60 * 60 * 1000)
      }],
      loading: true
    }, {
      heading: 'Notification Tab 2',
      subHeading: '3 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'info',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (240 * 60 * 60 * 1000)
      }]
    }, {
      heading: 'Notification Tab 4',
      subHeading: '3 New Events',
      notifications: []
    }, {
      heading: 'Notification Tab 5',
      subHeading: '3 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'danger',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (240 * 60 * 60 * 1000)
      }]
    }, {
      heading: 'Notification Tab 6',
      subHeading: '3 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'info',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: actionConfig.moreActions,
        timeStamp: currentTime - (240 * 60 * 60 * 1000)
      }]
    }];
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,  EmptyStateModule, ActionModule],
      declarations: [NotificationDrawerComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NotificationDrawerComponent);
        comp = fixture.componentInstance;
        comp.hidden = false;
        comp.expanded = false;
        comp.title = 'Notification drawer';
        comp.notificationGroups = groups;
        fixture.detectChanges();
      });
  }));

  it('should have the title set corretly', () => {
    let results = fixture.debugElement.query(By.css('.drawer-pf-title'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim()).toContain(comp.title);
  });

  it('should expand when allowexpand set to be true', () => {
    let field = fixture.debugElement.query(By.css('.drawer-pf-toggle-expand'));
    expect(field).toBeNull();

    comp.allowExpand = true;
    fixture.detectChanges();

    let results = fixture.debugElement.query(By.css('.drawer-pf-toggle-expand'));
    expect(results).not.toBeNull();
  });

  it('close button should fire event and update hidden value', () => {
    let results = fixture.debugElement.query(By.css('.drawer-pf-close'));
    expect(results).not.toBeNull();

    comp.close.subscribe((data: boolean) => {
      expect(data).toBe(true);
      expect(comp.hidden).toBe(true);
    });

    results.triggerEventHandler('click', {});
    fixture.detectChanges();

  });

  it('should emit a unread notification event on init', () => {
    comp.unreadNotifications.subscribe((data: boolean) => {
      expect(data).toBe(true);
      expect(comp.unreadNotifications).toBe(true);
    });
  });

  it('should have toggled the collapsed panel', () => {
    let results = fixture.debugElement.query(By.css('.panel-title a'));
    expect(results).not.toBeNull();

    results.triggerEventHandler('click', {});
    fixture.detectChanges();

    let panel = fixture.debugElement.query(By.css('.panel-collapse.collapse.in'));
    expect(panel).not.toBeNull();

  });
});
