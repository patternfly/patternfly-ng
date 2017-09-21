import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NavigationItemConfig } from '../navigation-item-config';

@Component({
  selector: 'simple-vertical-navigation-example',
  styles: [`    
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
    /*.sample-form .form-horizontal .form-group {*/
      /*margin-left: 0px;*/
    /*}*/
    
    /*.padding-top-15 {*/
      /*padding-top: 15px;*/
    /*}*/
    
    /*.padding-bottom-15 {*/
      /*padding-bottom: 15px;*/
    /*}*/
  `],
  templateUrl: './simple-vertical-navigation-example.component.html'
})
export class SimpleVerticalNavigationExampleComponent implements OnInit {

  showExample: boolean = false;
  navigationItems: NavigationItemConfig[];
  actionText: string = '';

  constructor(private chRef: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {

    this.navigationItems = [
      {
        title: "Dashboard",
        iconClass: "fa fa-dashboard",
        href: "/navigation/dashboard"
      },
      {
        title: "Dolor",
        iconClass : "fa fa-shield",
        href: "/navigation/dolor",
        badges: [
          {
            count: 1283,
            tooltip: "Total number of items"
          }
        ]
      },
      {
        title: "Ipsum",
        iconClass: "fa fa-space-shuttle",
        children: [
          {
            title: "Intellegam",
            children: [
              {
                title: "Recteque",
                href: "/navigation/ipsum/intellegam/recteque",
                badges: [
                  {
                    count: 6,
                    tooltip: "Total number of error items",
                    badgeClass: 'example-error-background'
                  }
                ]
              },
              {
                title: "Suavitate",
                href: "/navigation/ipsum/intellegam/suavitate",
                badges: [
                  {
                    count: 2,
                    tooltip: "Total number of items"
                  }
                ]
              },
              {
                title: "Vituperatoribus",
                href: "/navigation/ipsum/intellegam/vituperatoribus",
                badges: [
                  {
                    count: 18,
                    tooltip: "Total number of warning items",
                    badgeClass: 'example-warning-background'
                  }
                ]
              }
            ]
          },
          {
            title: "Copiosae",
            children: [
              {
                title: "Exerci",
                href: "/navigation/ipsum/copiosae/exerci",
                badges: [
                  {
                    count: 2,
                    tooltip: "Total number of error items",
                    iconClass: 'pficon pficon-error-circle-o'
                  },
                  {
                    count: 6,
                    tooltip: "Total number warning error items",
                    iconClass: 'pficon pficon-warning-triangle-o'
                  }
                ]
              },
              {
                title: "Quaeque",
                href: "/navigation/ipsum/copiosae/quaeque",
                badges: [
                  {
                    count: 0,
                    tooltip: "Total number of error items",
                    iconClass: 'pficon pficon-error-circle-o'
                  },
                  {
                    count: 4,
                    tooltip: "Total number warning error items",
                    iconClass: 'pficon pficon-warning-triangle-o'
                  }
                ]
              },
              {
                title: "Utroque",
                href: "/navigation/ipsum/copiosae/utroque",
                badges: [
                  {
                    count: 1,
                    tooltip: "Total number of error items",
                    iconClass: 'pficon pficon-error-circle-o'
                  },
                  {
                    count: 2,
                    tooltip: "Total number warning error items",
                    iconClass: 'pficon pficon-warning-triangle-o'
                  }
                ]
              }
            ]
          },
          {
            title: "Patrioque",
            children: [
              {
                title: "Novum",
                href: "/navigation/ipsum/patrioque/novum"
              },
              {
                title: "Pericula",
                href: "/navigation/ipsum/patrioque/pericula"
              },
              {
                title: "Gubergren",
                href: "/navigation/ipsum/patrioque/gubergren"
              }
            ]
          },
          {
            title: "Accumsan",
            href: "/navigation/ipsum/Accumsan",
            badges: [
              {
                count: 2,
                tooltip: "Total number of error items",
                iconClass: 'pficon pficon-error-circle-o'
              },
              {
                count: 6,
                tooltip: "Total number warning error items",
                iconClass: 'pficon pficon-warning-triangle-o'
              }
            ]
          }
        ]
      },
      {
        title: "Amet",
        iconClass: "fa fa-paper-plane",
        children: [
          {
            title: "Detracto",
            children: [
              {
                title: "Delicatissimi",
                href: "/navigation/amet/detracto/delicatissimi"
              },
              {
                title: "Aliquam",
                href: "/navigation/amet/detracto/aliquam"
              },
              {
                title: "Principes",
                href: "/navigation/amet/detracto/principes"
              }
            ]
          },
          {
            title: "Mediocrem",
            children: [
              {
                title: "Convenire",
                href: "/navigation/amet/mediocrem/convenire"
              },
              {
                title: "Nonumy",
                href: "/navigation/amet/mediocrem/nonumy"
              },
              {
                title: "Deserunt",
                href: "/navigation/amet/mediocrem/deserunt"
              }
            ]
          },
          {
            title: "Corrumpit",
            children: [
              {
                title: "Aeque",
                href: "/navigation/amet/corrumpit/aeque"
              },
              {
                title: "Delenit",
                href: "/navigation/amet/corrumpit/delenit"
              },
              {
                title: "Qualisque",
                href: "/navigation/amet/corrumpit/qualisque"
              }
            ]
          },
          {
            title: "urbanitas",
            href: "/navigation/amet/urbanitas"
          }
        ]
      },
      {
        title: "Adipscing",
        iconClass: "fa fa-graduation-cap",
        href: "/navigation/adipscing"
      },
      {
        title: "Lorem",
        iconClass: "fa fa-gamepad",
        href: "/navigation/lorem"
      },
      {
        title: "Exit Demo"
      }
    ];
  }

  toggleExample(): void {
    this.showExample = !this.showExample;
    this.chRef.detectChanges();
  }

  onItemClicked($event): void {
    this.actionText += 'Item Clicked ' + '\n';
  }

  onNavigation($event): void {
    this.actionText += 'Navigation event fired '  + '\n';
  }
}
