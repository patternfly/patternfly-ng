import {
    Component,
    OnInit,
    ViewEncapsulation
  } from '@angular/core';
  import { NotificationType } from '../../notification-type';
  import { NotificaitonGroup } from '../../notification-group';
  import { Notification } from '../../notification';
import { time } from 'd3';
  
  @Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'notification-drawer-example',
    templateUrl: './notification-drawer-example.component.html'
  })

  export class NotificationDrawerExampleComponent implements OnInit {

    hideDrawer: boolean = true;
    notifications: Notification[];
    menuActions: any;
    groups: any;
    unreadNotifications: boolean = false; 
    currentTime: number;
    

    toggleShowDrawer() {
      this.hideDrawer = !this.hideDrawer;
    }
    
   
   

    constructor() {

    }

    ngOnInit(): void {

      this.menuActions = [
        {
          name: 'Action',
          title: 'Perform an action'
        },
        {
          name: 'Another Action',
          title: 'Do something else'
        },
        {
          name: 'Disabled Action',
          title: 'Unavailable action',
          isDisabled: true
        },
        {
          name: 'Something Else',
          title: ''
        },
        {
          isSeparator: true
        },
        {
          name: 'Grouped Action 1',
          title: 'Do something'
        },
        {
          name: 'Grouped Action 2',
          title: 'Do something similar'
        }
      ];

      
    this.currentTime = (new Date()).getTime();
       
    this.groups = [
        {
          heading: 'Notification Tab 1',
          subHeading: '5 New Events',
          notifications: [
            {
              uid: 1,
              unread: true,
              message: 'A New Event! Huzzah! Bold.',
              status: 'info',
              actions: this.menuActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              uid: 2,
              unread: true,
              message: 'Another Event Notification',
              status: 'ok',
              actions: this.menuActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              uid: 3,
              unread: false,
              message: 'Another Event Notification',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              uid: 4,
              unread: false,
              message: 'Another Event Notification',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              uid: 5,
              unread: true,
              message: 'A New Event! Huzzah! Bold',
              status: 'info',
              actions: this.menuActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              uid: 6,
              unread: true,
              message: 'Another Event Notification',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              uid: 7,
              unread: false,
              message: 'Another Event Notification',
              status: 'ok',
              actions: this.menuActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              uid: 8,
              unread: false,
              message: 'Another Event Notification',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              uid: 9,
              unread: true,
              message: 'Another Event Notification',
              status: 'info',
              actions: this.menuActions,
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
              uid: 10,
              unread: true,
              message: 'A New Event! Huzzah! Bold',
              status: 'info',
              actions: this.menuActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              uid: 11,
              unread: true,
              message: 'Another Event Notification',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              uid: 12,
              unread: false,
              message: 'Another Event Notification',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              uid: 13,
              unread: false,
              message: 'Another Event Notification',
              status: 'ok',
              actions: this.menuActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              uid: 14,
              unread: true,
              message: 'Another Event Notification',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ]
        },
        {
          heading: 'Notification Tab 4',
          subHeading: '3 New Events',
          notifications: [
            {
              uid: 15,
              unread: true,
              message: 'A New Event! Huzzah! Bold',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              uid: 16,
              unread: true,
              message: 'Another Event Notification',
              status: 'ok',
              actions: this.menuActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              uid: 17,
              unread: false,
              message: 'Another Event Notification',
              status: 'ok',
              actions: this.menuActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              uid: 18,
              unread: false,
              message: 'Another Event Notification',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              uid: 19,
              unread: true,
              message: 'Another Event Notification',
              status: 'info',
              actions: this.menuActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ]
        },
        {
          heading: 'Notification Tab 5',
          subHeading: '3 New Events',
          notifications: [
            {
              uid: 20,
              unread: true,
              message: 'A New Event! Huzzah! Bold',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (1 * 60 * 60 * 1000)
            },
            {
              uid: 21,
              unread: true,
              message: 'Another Event Notification',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (2 * 60 * 60 * 1000)
            },
            {
              uid: 22,
              unread: false,
              message: 'Another Event Notification',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (10 * 60 * 60 * 1000)
            },
            {
              uid: 23,
              unread: false,
              message: 'Another Event Notification',
              status: 'warning',
              actions: this.menuActions,
              timeStamp: this.currentTime - (12 * 60 * 60 * 1000)
            },
            {
              uid: 24,
              unread: true,
              message: 'Another Event Notification',
              status: 'error',
              actions: this.menuActions,
              timeStamp: this.currentTime - (240 * 60 * 60 * 1000)
            }
          ]
        }
      ];
    }

  }
