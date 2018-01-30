import {
    async,
    ComponentFixture,
    TestBed
  } from '@angular/core/testing';
  import { By } from '@angular/platform-browser';
  import { FormsModule } from '@angular/forms';
  import { RouterTestingModule } from '@angular/router/testing';
  import { NavigationItemConfig } from '../navigation-item-config';
  import { TooltipModule } from 'ngx-bootstrap';
  import { ApplicationLauncherComponent } from './application-launcher.component';


  describe('Application Launcher componet', () => {
    let comp: ApplicationLauncherComponent;
    let fixture: ComponentFixture<ApplicationLauncherComponent>;
    let navigationItems: NavigationItemConfig[];
    let isClicked: boolean = false;


    beforeEach(() => {

      navigationItems = [
        {
          title: 'Recteque',
          url : '#/applauncher/recteque',
          iconStyleClass: 'pficon-storage-domain',
          badges: [{
                    count: 1,
                    tooltip: 'Launch the Function User Interface'

          }]
        },
        {
          title: 'Suavitate',
          url : '#/applauncher/intellegam/suavitate',
          iconStyleClass: 'pficon-build',
          badges: [{
                  count: 2,
                  tooltip: 'Launch the Function User Interface'
          }]
        },
        {
          title: 'Lorem',
          url : '#/applauncher/intellegam/lorem',
          iconStyleClass: 'pficon-domain',
          badges: [{
                  count: 3,
                  tooltip: 'Launch the Function User Interface'
          }]
        },
        {
          title: 'Home',
          url : '/',
          iconStyleClass: 'pficon-home',
          badges: [{
                  count: 4,
                  tooltip: 'Launch the Function User Interface'
          }]
        }
      ];

    });

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, TooltipModule.forRoot(), RouterTestingModule],
        declarations: [ApplicationLauncherComponent]
      })
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(ApplicationLauncherComponent);
          comp = fixture.componentInstance;


          comp.items = navigationItems;
          comp.label = 'Application Launche';
          comp.showAsList = false;
          comp.hiddenIcons = false;
          comp.disabled = false;

          fixture.detectChanges();
        });
    }));

    it('should add the applauncher nav ', () => {
      let primaryMenu = fixture.debugElement.query(By.css('.applauncher-pf'));
      expect(primaryMenu).not.toBeNull();

    });

    it('should not show icons in hiddenIcons mode', () => {

      comp.hiddenIcons = true;
      fixture.detectChanges();

      let primaryItems = fixture.debugElement.queryAll(
        By.css('.applauncher-pf-item'));
        expect(primaryItems.length).toBe(4);


      let iconSpan = primaryItems[0].query(By.css('.applauncher-pf-item > a > i'));
      expect(iconSpan.classes['hidden']).toBeTruthy();
    });


    it('should invoke the toggle when an item is clicked', () => {
      expect(comp.isClicked).toBeFalsy();

      let primaryItems = fixture.debugElement.query(
        By.css('.applauncher-pf > a'));
        expect(primaryItems);

      primaryItems.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(comp.isClicked).toBeTruthy();

    });


  });

