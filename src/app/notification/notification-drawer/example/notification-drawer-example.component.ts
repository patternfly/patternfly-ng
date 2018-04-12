import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewEncapsulation
  } from '@angular/core';
  import { NotificationType } from '../../notification-type';
  import { NotificaitonGroup } from '../../notification-group';
  import { Notification } from '../../notification';
import { time } from 'd3';
import { Action } from '../../../action/action';
import { ActionConfig } from '../../../action/action-config';
  
  @Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'notification-drawer-example',
    templateUrl: './notification-drawer-example.component.html'
  })

  export class NotificationDrawerExampleComponent implements OnInit {

    hide: boolean = true;
    notifications: Notification[];
    groups: any;
    unread: boolean = false; 
    currentTime: number;
    actionConfig: ActionConfig;
   

    toggleShowDrawer() {
      this.hide = !this.hide;
    }
    
    close($event: boolean): void {
      this.hide = !this.hide;
    }
   
    unreadNotifications($event: boolean): void {
      this.unread = $event;
      this.chRef.detectChanges();
    }
   

    constructor(private chRef: ChangeDetectorRef) {
      
    }

    ngOnInit(): void {
      
     this.actionConfig = { 
       moreActions : [
        {
          title: 'Action',
          tooltip: 'Perform an action'
        },
        {
          title: 'Another Action',
          tooltip: 'Do something else'
        },
        {
          title: 'Disabled Action',
          tooltip: 'Unavailable action',
          disabled: true
        },
        {
          title: 'Something Else',
          tooltip: ''
        },
        {
          separator: true
        },
        {
          title: 'Grouped Action 1',
          tooltip: 'Do something'
        },
        {
          title: 'Grouped Action 2',
          tooltip: 'Do something similar'
        }
      ]
    } as ActionConfig; 

      
    this.currentTime = (new Date()).getTime();
       
    this.groups = [
        {
          heading: 'Notification Tab 1',
          subHeading: '5 New Events',
          notifications: [
            {
              isViewing: true,
              message: 'A New Event! Huzzah! Bold.',
              type: 'info',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              
              isViewing: true,
              message: 'Another Event Notification',
              type: 'success',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            { 
              isViewing: false,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            { 
              isViewing: false,
              message: 'Another Event Notification',
              type: 'danger',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            { 
              isViewing: true,
              message: 'A New Event! Huzzah! Bold',
              type: 'info',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            { 
              isViewing: true,
              message: 'Another Event Notification',
              type: 'error',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            { 
              isViewing: false,
              message: 'Another Event Notification',
              type: 'success',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            { 
              isViewing: false,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              
              isViewing: true,
              message: 'Another Event Notification',
              type: 'info',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ],
          isLoading: true
        },
        {
          heading: 'Notification Tab 2',
          subHeading: '3 New Events',
          notifications: [
            {
              isViewing: true,
              message: 'A New Event! Huzzah! Bold',
              type: 'info',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'danger',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              isViewing: false,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              isViewing: false,
              message: 'Another Event Notification',
              type: 'success',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ]
        },
        {
          heading: 'Notification Tab 4',
          subHeading: '3 New Events',
          notifications: []
        },
        {
          heading: 'Notification Tab 5',
          subHeading: '3 New Events',
          notifications: [
            {
              isViewing: true,
              message: 'A New Event! Huzzah! Bold',
              type: 'danger',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'danger',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              isViewing: false,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              isViewing: false,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'danger',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ]
        },
        {
          heading: 'Notification Tab 6',
          subHeading: '3 New Events',
          notifications: [
            {
              isViewing: true,
              message: 'A New Event! Huzzah! Bold',
              type: 'info',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'danger',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'success',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              isViewing: true,
              message: 'Another Event Notification',
              type: 'warning',
              moreActions: this.actionConfig.moreActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ]
        },
      ];
    }

  }
