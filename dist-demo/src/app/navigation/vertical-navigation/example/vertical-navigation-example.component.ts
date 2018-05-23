import {
  ChangeDetectorRef,
  Component,
  OnInit, ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItemConfig } from '../../navigation-item-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'vertical-navigation-example',
  styles: [`    
    .faux-layout {
      position: fixed;
      top: 37px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f5f5f5;
      padding-top: 15px;
      z-index: 1100;
    }
    .example-page-container.container-fluid {
      position: fixed;
      top: 37px;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f5f5f5;
      padding-top: 15px;
    }

    .hide-vertical-nav {
      margin-top: 15px;
      margin-left: 30px;
    }
    
    .navbar-brand-txt {
      line-height: 34px;
    }
  `],
  templateUrl: './vertical-navigation-example.component.html'
})
export class VerticalNavigationExampleComponent implements OnInit {

  showExample: boolean = false;
  navigationItems: NavigationItemConfig[];
  actionText: string = '';

  constructor(private chRef: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.navigationItems = [
      {
        title: 'Dashboard',
        iconStyleClass: 'fa fa-dashboard',
        url: '/navigation/dashboard'
      },
      {
        title: 'Dolor',
        iconStyleClass: 'fa fa-shield',
        url: '/navigation/dolor',
        badges: [
          {
            count: 1283,
            tooltip: 'Total number of items'
          }
        ]
      },
      {
        title: 'Ipsum',
        iconStyleClass: 'fa fa-space-shuttle',
        children: [
          {
            title: 'Intellegam',
            children: [
              {
                title: 'Recteque',
                url: '/navigation/ipsum/intellegam/recteque',
                badges: [
                  {
                    count: 6,
                    tooltip: 'Total number of error items',
                    badgeClass: 'example-error-background'
                  }
                ]
              },
              {
                title: 'Suavitate',
                url: '/navigation/ipsum/intellegam/suavitate',
                badges: [
                  {
                    count: 2,
                    tooltip: 'Total number of items'
                  }
                ]
              },
              {
                title: 'Vituperatoribus',
                url: '/navigation/ipsum/intellegam/vituperatoribus',
                badges: [
                  {
                    count: 18,
                    tooltip: 'Total number of warning items',
                    badgeClass: 'example-warning-background'
                  }
                ]
              }
            ]
          },
          {
            title: 'Copiosae',
            children: [
              {
                title: 'Exerci',
                url: '/navigation/ipsum/copiosae/exerci',
                badges: [
                  {
                    count: 2,
                    tooltip: 'Total number of error items',
                    iconStyleClass: 'pficon pficon-error-circle-o'
                  },
                  {
                    count: 6,
                    tooltip: 'Total number warning error items',
                    iconStyleClass: 'pficon pficon-warning-triangle-o'
                  }
                ]
              },
              {
                title: 'Quaeque',
                url: '/navigation/ipsum/copiosae/quaeque',
                badges: [
                  {
                    count: 0,
                    tooltip: 'Total number of error items',
                    iconStyleClass: 'pficon pficon-error-circle-o'
                  },
                  {
                    count: 4,
                    tooltip: 'Total number warning error items',
                    iconStyleClass: 'pficon pficon-warning-triangle-o'
                  }
                ]
              },
              {
                title: 'Utroque',
                url: '/navigation/ipsum/copiosae/utroque',
                badges: [
                  {
                    count: 1,
                    tooltip: 'Total number of error items',
                    iconStyleClass: 'pficon pficon-error-circle-o'
                  },
                  {
                    count: 2,
                    tooltip: 'Total number warning error items',
                    iconStyleClass: 'pficon pficon-warning-triangle-o'
                  }
                ]
              }
            ]
          },
          {
            title: 'Patrioque',
            children: [
              {
                title: 'Novum',
                url: '/navigation/ipsum/patrioque/novum'
              },
              {
                title: 'Pericula',
                url: '/navigation/ipsum/patrioque/pericula'
              },
              {
                title: 'Gubergren',
                url: '/navigation/ipsum/patrioque/gubergren'
              }
            ]
          },
          {
            title: 'Accumsan',
            url: '/navigation/ipsum/Accumsan',
            badges: [
              {
                count: 2,
                tooltip: 'Total number of error items',
                iconStyleClass: 'pficon pficon-error-circle-o'
              },
              {
                count: 6,
                tooltip: 'Total number warning error items',
                iconStyleClass: 'pficon pficon-warning-triangle-o'
              }
            ]
          }
        ]
      },
      {
        title: 'Amet',
        iconStyleClass: 'fa fa-paper-plane',
        children: [
          {
            title: 'Detracto',
            children: [
              {
                title: 'Delicatissimi',
                url: '/navigation/amet/detracto/delicatissimi'
              },
              {
                title: 'Aliquam',
                url: '/navigation/amet/detracto/aliquam'
              },
              {
                title: 'Principes',
                url: '/navigation/amet/detracto/principes'
              }
            ]
          },
          {
            title: 'Mediocrem',
            children: [
              {
                title: 'Convenire',
                url: '/navigation/amet/mediocrem/convenire'
              },
              {
                title: 'Nonumy',
                url: '/navigation/amet/mediocrem/nonumy'
              },
              {
                title: 'Deserunt',
                url: '/navigation/amet/mediocrem/deserunt'
              }
            ]
          },
          {
            title: 'Corrumpit',
            children: [
              {
                title: 'Aeque',
                url: '/navigation/amet/corrumpit/aeque'
              },
              {
                title: 'Delenit',
                url: '/navigation/amet/corrumpit/delenit'
              },
              {
                title: 'Qualisque',
                url: '/navigation/amet/corrumpit/qualisque'
              }
            ]
          },
          {
            title: 'urbanitas',
            url: '/navigation/amet/urbanitas'
          }
        ]
      },
      {
        title: 'Adipscing',
        iconStyleClass: 'fa fa-graduation-cap',
        url: '/navigation/adipscing'
      },
      {
        title: 'Lorem',
        iconStyleClass: 'fa fa-gamepad',
        url: '/navigation/lorem'
      }
    ];
  }

  toggleExample(): void {
    this.showExample = !this.showExample;
    this.chRef.detectChanges();
  }

  onItemClicked($event: NavigationItemConfig): void {
    this.actionText += 'Item Clicked: ' + $event.title + '\n';
  }

  onNavigation($event: NavigationItemConfig): void {
    this.actionText += 'Navigation event fired: ' + $event.title + '\n';
  }
}
