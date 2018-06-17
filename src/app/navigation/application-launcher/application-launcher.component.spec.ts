import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap';

import { ApplicationLauncherComponent } from './application-launcher.component';
import { ApplicationLauncherConfig } from './application-launcher-config';

describe('Application Launcher componet', () => {
  let comp: ApplicationLauncherComponent;
  let fixture: ComponentFixture<ApplicationLauncherComponent>;
  let navigationItems: ApplicationLauncherConfig[];

  beforeEach(() => {
    navigationItems = [{
      title: 'Recteque',
      url : '#/applauncher',
      iconStyleClass: 'pficon-storage-domain',
      badges: [{
        count: 1,
        tooltip: 'Launch the Function User Interface'
      }]
    }, {
      title: 'Suavitate',
      url : '#/applauncher',
      iconStyleClass: 'pficon-build',
      badges: [{
        count: 2,
        tooltip: 'Launch the Function User Interface'
      }]
    }, {
      title: 'Lorem',
      url : '#/applauncher',
      iconStyleClass: 'pficon-domain',
      badges: [{
        count: 3,
        tooltip: 'Launch the Function User Interface'
      }]
    }, {
      title: 'Home',
      url : '/',
      iconStyleClass: 'pficon-home',
      badges: [{
        count: 4,
        tooltip: 'Launch the Function User Interface'
      }]
    }];
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BsDropdownModule.forRoot(),
        FormsModule,
        TooltipModule.forRoot()
      ],
      declarations: [ApplicationLauncherComponent],
      providers: [BsDropdownConfig]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ApplicationLauncherComponent);
        comp = fixture.componentInstance;
        comp.items = navigationItems;
        comp.label = 'Application Launcher';
        comp.showAsList = false;
        comp.showIcons = true;
        comp.disabled = false;
        fixture.detectChanges();
      });
  }));

  it('should add the applauncher nav ', () => {
    let primaryMenu = fixture.debugElement.query(By.css('.applauncher-pf'));
    expect(primaryMenu).not.toBeNull();
  });

  it('should not show icons', fakeAsync(() => {
    comp.showIcons = false;
    const element = fixture.nativeElement;

    let button = element.querySelector('.applauncher-pf .dropdown-toggle');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    let primaryItems = fixture.debugElement.queryAll(By.css('.applauncher-pf-item'));
    expect(primaryItems.length).toBe(4);

    let iconSpan = primaryItems[0].query(By.css('.applauncher-pf-item > a > i'));
    expect(iconSpan.classes['hidden']).toBeTruthy();
  }));

  it('should invoke the toggle when an item is clicked', () => {
    let menu = fixture.debugElement.query(By.css('.applauncher-pf'));
    expect(menu);

    menu.triggerEventHandler('click', {});
    fixture.detectChanges();

    menu = fixture.debugElement.query(By.css('.applauncher-pf .open'));
    expect(menu);
  });
});
