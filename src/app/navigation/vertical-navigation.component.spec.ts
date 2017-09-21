import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { VerticalNavigationComponent } from './vertical-navigation.component';
import { TooltipModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationItemConfig } from './navigation-item-config';

describe('Component:  pfVerticalNavigation - ', () => {
  let comp: VerticalNavigationComponent;
  let fixture: ComponentFixture<VerticalNavigationComponent>;
  let navigationItems: NavigationItemConfig[] = [
    {
      title: "Dashboard",
      iconClass: "fa fa-dashboard",
      href: "#/dashboard"
    },
    {
      title: "Dolor",
      iconClass : "fa fa-shield",
      href: "#/dolor",
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
      active: true,
      children: [
        {
          title: "Intellegam",
          active: true,
          children: [
            {
              title: "Recteque",
              href: "#/ipsum/intellegam/recteque",
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
              href: "#/ipsum/intellegam/suavitate",
              badges: [
                {
                  count: 0,
                  tooltip: "Total number of items",
                  badgeClass: 'example-ok-background'
                }
              ]
            },
            {
              title: "Vituperatoribus",
              href: "#/ipsum/intellegam/vituperatoribus",
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
              href: "#/ipsum/copiosae/exerci"
            },
            {
              title: "Quaeque",
              href: "#/ipsum/copiosae/quaeque"
            },
            {
              title: "Utroque",
              href: "#/ipsum/copiosae/utroque"
            }
          ]
        },
        {
          title: "Patrioque",
          children: [
            {
              title: "Novum",
              href: "#/ipsum/patrioque/novum"
            },
            {
              title: "Pericula",
              href: "#/ipsum/patrioque/pericula"
            },
            {
              title: "Gubergren",
              href: "#/ipsum/patrioque/gubergren"
            }
          ]
        },
        {
          title: "Accumsan",
          href: "#/ipsum/Accumsan"
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
              href: "#/amet/detracto/delicatissimi"
            },
            {
              title: "Aliquam",
              href: "#/amet/detracto/aliquam"
            },
            {
              title: "Principes",
              href: "#/amet/detracto/principes"
            }
          ]
        },
        {
          title: "Mediocrem",
          children: [
            {
              title: "Convenire",
              href: "#/amet/mediocrem/convenire"
            },
            {
              title: "Nonumy",
              href: "#/amet/mediocrem/nonumy"
            },
            {
              title: "Deserunt",
              href: "#/amet/mediocrem/deserunt"
            }
          ]
        },
        {
          title: "Corrumpit",
          children: [
            {
              title: "Aeque",
              href: "#/amet/corrumpit/aeque"
            },
            {
              title: "Delenit",
              href: "#/amet/corrumpit/delenit"
            },
            {
              title: "Qualisque",
              href: "#/amet/corrumpit/qualisque"
            }
          ]
        },
        {
          title: "urbanitas",
          href: "#/amet/urbanitas"
        }
      ]
    },
    {
      title: "Adipscing",
      iconClass: "fa fa-graduation-cap",
      href: "#/adipscing"
    },
    {
      title: "Lorem",
      iconClass: "fa fa-gamepad",
      href: "#/lorem"
    }
  ];

  let navigateItem, clickItem;

  beforeEach(async(() => {
    navigateItem = undefined;
    clickItem = undefined;
    TestBed.configureTestingModule({
      imports: [FormsModule, TooltipModule.forRoot(), RouterTestingModule],
      declarations: [VerticalNavigationComponent],
      providers: []
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VerticalNavigationComponent);
        comp = fixture.componentInstance;

        comp.navigatedEvent.subscribe((item: any) => {
          navigateItem = item.title;
        });

        comp.itemClickEvent.subscribe((item: any) => {
          clickItem = item.title;
        });

        comp.items = navigationItems;
        comp.brandAlt = "ANGULAR PATTERNFLY";
        comp.brandSrc = "images/test.svg";
        comp.pinnableMenus = true;
        comp.showBadges = true;
        comp.updateActiveItemsOnClick = true;
        comp.ignoreMobile = true;
        fixture.detectChanges();
      });
  }));

  it('should add the vertical navigation menus', () => {
    let primaryMenu = fixture.debugElement.query(By.css('.nav-pf-vertical'));
    expect(primaryMenu).not.toBeNull();

    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let secondaryMenu = primaryItems[2].query(By.css('.nav-pf-secondary-nav'));
    expect(secondaryMenu).not.toBeNull();

    let secondaryItems = secondaryMenu.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item'));
    expect(secondaryItems.length).toBe(4);

    let tertiaryMenu = secondaryItems[0].query(By.css('.nav-pf-tertiary-nav'));
    expect(tertiaryMenu).not.toBeNull();

    let tertiaryItems = tertiaryMenu.queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item'));
    expect(tertiaryItems.length).toBe(3);
  });

  it('should pin menus when specified', () => {
    let collased = fixture.debugElement.query(By.css('.collapsed-secondary-nav-pf.nav'));
    expect(collased).toBeNull();

    collased = fixture.debugElement.query(By.css('.collapsed-tertiary-nav-pf'));
    expect(collased).toBeNull();

    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    // third item is active, use it to check for pin icon
    let secondaryMenu = primaryItems[2].query(By.css('.nav-pf-secondary-nav'));
    expect(secondaryMenu).not.toBeNull();

    let collapseToggle = secondaryMenu.queryAll(By.css('.secondary-collapse-toggle-pf'));
    expect(collapseToggle.length).toBe(1);

    collapseToggle[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    collased = fixture.debugElement.query(By.css('.collapsed-secondary-nav-pf'));
    expect(collased).not.toBeNull();

    collased = fixture.debugElement.query(By.css('.collapsed-tertiary-nav-pf'));
    expect(collased).toBeNull();

    let secondaryItems = secondaryMenu.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item'));
    expect(secondaryItems.length).toBe(4);

    let tertiaryMenu = secondaryItems[0].queryAll(By.css('.nav-pf-tertiary-nav'));
    expect(tertiaryMenu.length).toBe(1);

    collapseToggle = tertiaryMenu[0].queryAll(By.css('.tertiary-collapse-toggle-pf'));
    expect(collapseToggle.length).toBe(1);

    collapseToggle[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    collased = fixture.debugElement.query(By.css('.collapsed-tertiary-nav-pf'));
    expect(collased).not.toBeNull();
  });

  it('should not show icons in hiddenIcons mode', () => {

    comp.hiddenIcons = true;
    fixture.detectChanges();

    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let iconSpan = primaryItems[0].query(By.css('.list-group-item > a > span'));
    expect(iconSpan.classes['hidden']).toBeTruthy();
  });

  it('should go to collapse mode when collpase toggle is clicked', () => {
    let menu = fixture.debugElement.query(By.css('.nav-pf-vertical'));
    expect(menu).not.toBeNull();

    let collapsedMenu = fixture.debugElement.query(By.css('.nav-pf-vertical.collapsed'));
    expect(collapsedMenu).toBeNull();

    let navBarToggle = fixture.debugElement.query(By.css('.navbar-header .navbar-toggle'));
    expect(navBarToggle).not.toBeNull();

    navBarToggle.triggerEventHandler('click', {});
    fixture.detectChanges();

    menu = fixture.debugElement.query(By.css('.nav-pf-vertical'));
    expect(menu).not.toBeNull();

    collapsedMenu = fixture.debugElement.query(By.css('.nav-pf-vertical.collapsed'));
    expect(collapsedMenu).not.toBeNull();
  });

  it('should show the alternate text when specified', () => {
    let brandIcon = fixture.debugElement.queryAll(By.css('.navbar-brand-icon'));
    expect(brandIcon.length).toBe(1);
    let brandText = fixture.debugElement.queryAll(By.css('.navbar-brand-txt'));
    expect(brandText.length).toBe(0);

    comp.brandSrc = "";
    comp.hiddenIcons = true;
    fixture.detectChanges();

    brandIcon = fixture.debugElement.queryAll(By.css('.navbar-brand-icon'));
    expect(brandIcon.length).toBe(0);
    brandText = fixture.debugElement.queryAll(By.css('.navbar-brand-txt'));
    expect(brandText.length).toBe(1);
  });


  it('should invoke the navigateCallback when an item is clicked', () => {
    expect(navigateItem).toBeUndefined();

    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item > a'));
    expect(primaryItems.length).toBe(6);

    primaryItems[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(navigateItem).toBe(navigationItems[0].title);

    // Clicking a non-final item
    primaryItems[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(navigateItem).toBe(navigationItems[2].children[0].children[0].title);
  });

  it('should invoke the itemClickCallback when any item is clicked', () => {
    expect(clickItem).toBeUndefined();

    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item > a'));
    expect(primaryItems.length).toBe(6);

    primaryItems[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(clickItem).toBe(navigationItems[0].title);

    // Clicking a non-final item
    primaryItems[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(clickItem).toBe(navigationItems[2].title);
  });

  it('should set active items on primary item click when updateActiveItemsOnClick is true', () => {
    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item > a'));
    expect(primaryItems.length).toBe(6);

    primaryItems[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(clickItem).toBe(navigationItems[0].title);

    let activePrimary =  fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item.active'));
    expect(activePrimary.length).toBe(1);

    let activeSecondary =  fixture.debugElement.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item.active'));
    expect(activeSecondary.length).toBe(0);

    let activeTertiary =  fixture.debugElement.queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item.active'));
    expect(activeTertiary.length).toBe(0);

    expect(navigateItem).toBe(navigationItems[0].title);

    // Clicking a non-final item will set active items on sub menus
    primaryItems[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(clickItem).toBe(navigationItems[2].title);

    activePrimary =  fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item.active'));
    expect(activePrimary.length).toBe(1);

    activeSecondary =  fixture.debugElement.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item.active'));
    expect(activeSecondary.length).toBe(1);

    activeTertiary =  fixture.debugElement.queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item.active'));
    expect(activeTertiary.length).toBe(1);

    expect(navigateItem).toBe(navigationItems[2].children[0].children[0].title);
  });

  it('should set active items on secondary item click when updateActiveItemsOnClick is true', () => {
    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let secondaryItems = primaryItems[2].queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item > a'));
    expect(secondaryItems.length).toBe(4);

    // Clicking a non-final item will set active items on self, parent, and first sub item
    secondaryItems[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    let activePrimary =  fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item.active'));
    expect(activePrimary.length).toBe(1);

    let activeSecondary =  fixture.debugElement.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item.active'));
    expect(activeSecondary.length).toBe(1);

    let activeTertiary =  fixture.debugElement.queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item.active'));
    expect(activeTertiary.length).toBe(1);

    // Clicking a final item will set active items on self and parent
    secondaryItems[3].triggerEventHandler('click', {});
    fixture.detectChanges();

    activePrimary =  fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item.active'));
    expect(activePrimary.length).toBe(1);

    activeSecondary =  fixture.debugElement.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item.active'));
    expect(activeSecondary.length).toBe(1);

    activeTertiary = fixture.debugElement.queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item.active'));
    expect(activeTertiary.length).toBe(0);

    expect(navigateItem).toBe(navigationItems[2].children[3].title);
  });

  it('should set active items on tertiary item click when updateActiveItemsOnClick is true', () => {
    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let secondaryItems = primaryItems[2].queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item'));
    expect(secondaryItems.length).toBe(4);

    let tertiaryItems = secondaryItems[2].queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item > a'));
    expect(tertiaryItems.length).toBe(3);

    // Clicking a non-final item will set active items on self, parent, and first sub item
    tertiaryItems[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    let activePrimary =  fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item.active'));
    expect(activePrimary.length).toBe(1);

    let activeSecondary =  fixture.debugElement.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item.active'));
    expect(activeSecondary.length).toBe(1);

    let activeTertiary =  fixture.debugElement.queryAll(By.css('.nav-pf-tertiary-nav > .list-group > .list-group-item.active'));
    expect(activeTertiary.length).toBe(1);

    expect(navigateItem).toBe(navigationItems[2].children[2].children[1].title);

    // Clicking a final item will set active items on self and parent
    secondaryItems[3].triggerEventHandler('click', {});
    fixture.detectChanges();
  });

  it('should not update active items when updateActiveItemsOnClick is not true', function () {

    comp.updateActiveItemsOnClick = false;
    fixture.detectChanges();

    let primaryItems = fixture.debugElement.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item > a'));
    expect(primaryItems.length).toBe(6);

    primaryItems[0].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(clickItem).toBe(navigationItems[0].title);

    expect(navigateItem).toBe(navigationItems[0].title);

    primaryItems[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(clickItem).toBe(navigationItems[2].title);

    expect(navigateItem).toBe(navigationItems[2].children[0].children[0].title);
  });

  it('should add badges', function () {
    let primaryMenu = fixture.debugElement.query(By.css('.nav-pf-vertical'));
    expect(primaryMenu).not.toBeNull();

    let primaryItems = primaryMenu.queryAll(By.css('.nav-pf-vertical> .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let badges = primaryItems[1].queryAll(By.css('.badge'));
    expect(badges.length).toBe(1);

    let secondaryMenu = primaryItems[2].query(By.css('.nav-pf-secondary-nav'));
    expect(secondaryMenu).not.toBeNull();

    let secondaryItems = secondaryMenu.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item'));
    expect(secondaryItems.length).toBe(4);

    let tertiaryMenu = secondaryItems[0].query(By.css('.nav-pf-tertiary-nav'));
    expect(tertiaryMenu).not.toBeNull();

    let tertiaryBadges = tertiaryMenu.queryAll(By.css('.badge'));
    expect(tertiaryBadges.length).toBe(3);
  });

  it('should set classes on badges', function () {
    let primaryMenu = fixture.debugElement.query(By.css('.nav-pf-vertical'));
    expect(primaryMenu).not.toBeNull();

    let primaryItems = primaryMenu.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let secondaryMenu = primaryItems[2].query(By.css('.nav-pf-secondary-nav'));
    expect(secondaryMenu).not.toBeNull();

    let secondaryItems = secondaryMenu.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item'));
    expect(secondaryItems.length).toBe(4);

    let tertiaryMenu = secondaryItems[0].query(By.css('.nav-pf-tertiary-nav'));
    expect(tertiaryMenu).not.toBeNull();

    let errorBadge = tertiaryMenu.queryAll(By.css('.badge.example-error-background'));
    expect(errorBadge.length).toBe(1);

    let warningBadge = tertiaryMenu.queryAll(By.css('.badge.example-warning-background'));
    expect(warningBadge.length).toBe(1);
  });

  it('should not show badges with a 0 count', function () {
    let primaryMenu = fixture.debugElement.query(By.css('.nav-pf-vertical'));
    expect(primaryMenu).not.toBeNull();

    let primaryItems = primaryMenu.queryAll(By.css('.nav-pf-vertical > .list-group > .list-group-item'));
    expect(primaryItems.length).toBe(6);

    let secondaryMenu = primaryItems[2].query(By.css('.nav-pf-secondary-nav'));
    expect(secondaryMenu).not.toBeNull();

    let secondaryItems = secondaryMenu.queryAll(By.css('.nav-pf-secondary-nav > .list-group > .list-group-item'));
    expect(secondaryItems.length).toBe(4);

    let tertiaryMenu = secondaryItems[0].query(By.css('.nav-pf-tertiary-nav'));
    expect(tertiaryMenu).not.toBeNull();

    let errorBadge = tertiaryMenu.queryAll(By.css('.badge.example-error-background > span'));
    expect(errorBadge.length).toBe(1);

    let warningBadge = tertiaryMenu.queryAll(By.css('.badge.example-warning-background > span'));
    expect(warningBadge.length).toBe(1);

    warningBadge = tertiaryMenu.queryAll(By.css('.example-ok-background > span'));
    expect(warningBadge.length).toBe(0);
  });

  it('should not show badges when show-badges is not set', function () {
    let badgesMenu = fixture.debugElement.query(By.css('.nav-pf-vertical.nav-pf-vertical-with-badges'));
    expect(badgesMenu).not.toBeNull();

    let badgesShown = fixture.debugElement.query(By.css('.badge-container-pf'));
    expect(badgesShown).not.toBeNull();

    comp.showBadges = false;
    fixture.detectChanges();

    badgesMenu = fixture.debugElement.query(By.css('.nav-pf-vertical-with-badges'));
    expect(badgesMenu).toBeNull();

    badgesShown = fixture.debugElement.query(By.css('.badge-container-pf'));
    expect(badgesShown).toBeNull();
  });

});


