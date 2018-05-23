import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { NotificaitonGroup } from '../../notification-group';
import { Notification } from '../../notification';

import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
import { EmptyStateConfig } from '../../../empty-state/empty-state-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'notification-drawer-example',
  templateUrl: './notification-drawer-example.component.html'
})
export class NotificationDrawerExampleComponent implements OnInit {
  actionConfig: ActionConfig;
  actionText: string = '';
  currentTime: number;
  emptyStateConfig: EmptyStateConfig;
  empty: boolean = false;
  hide: boolean = true;
  groups: NotificaitonGroup[];
  unread: boolean = false;

  /**
   * The default constructor
   */
  constructor(private chRef: ChangeDetectorRef) {
    this.emptyStateConfig = {
      iconStyleClass: 'pficon-info',
      title: 'Tab4: There are no notifications to display .'
    };
  }

  // Initialization

  /**
   * Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.actionConfig = {
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
    this.currentTime = (new Date()).getTime();
    this.setGroups();
  }

  // Actions

  close($event: boolean): void {
    this.hide = !this.hide;
    this.actionText += 'Close drawer \n';
  }

  handleAction(action: Action): void {
    this.actionText = action.title + '\n' + this.actionText;
  }

  markAsRead(notify: Notification) {
    notify.isViewing = true;
    this.actionText += 'Mark notification read \n';
  }

  setEmptyState() {
    if (this.empty) { this.groups = null; } else {
      this.setGroups();
    }
  }

  toggleShowDrawer() {
    this.hide = !this.hide;
    this.actionText += 'show drawer:' + this.hide + '\n';
  }

  unreadNotifications($event: boolean): void {
    this.unread = $event;
    this.chRef.detectChanges();
    if (!this.unread) {
      this.actionText += 'No Notification \n';
    }
  }

  private setGroups() {
    this.groups = [{
      heading: 'Notification Tab 1',
      subHeading: '5 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold.',
        type: 'info',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'info',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'error',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'info',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
      }],
      loading: true
    }, {
      heading: 'Notification Tab 2',
      subHeading: '3 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'info',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
      }]
    }, {
      heading: 'Notification Tab 4',
      subHeading: '0 New Events',
      notifications: [],
      emptyStateConfig: this.emptyStateConfig
    }, {
      heading: 'Notification Tab 5',
      subHeading: '3 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'danger',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: false,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
      }]
    }, {
      heading: 'Notification Tab 6',
      subHeading: '3 New Events',
      notifications: [{
        isViewing: true,
        message: 'A New Event! Huzzah! Bold',
        type: 'info',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'danger',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'success',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
      }, {
        isViewing: true,
        message: 'Another Event Notification',
        type: 'warning',
        moreActions: this.actionConfig.moreActions,
        timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
      }]
    },
    ];
  }
}
