import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { CardAction } from '../card-action/card-action';
import { CardActionComponent } from '../card-action/card-action.component';
import { CardComponent } from './card.component';
import { CardConfig } from './card-config';
import { CardFilter } from '../card-filter/card-filter';
import { CardFilterComponent } from '../card-filter/card-filter.component';

describe('Card component - ', () => {
  let comp: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  let config: CardConfig;

  beforeEach(() => {
    config = {
      action: {
        hypertext: 'View All Events',
        iconStyleClass: 'fa fa-flag'
      },
      filters: [{
        title: 'Last 30 Days',
        value: '30'
      }, {
        default: true,
        title: 'Last 15 Days',
        value: '15'
      }, {
        title: 'Today',
        value: 'today'
      }],
      title: 'Cluster Utilization',
      subTitle: 'Last 30 Days'
    } as CardConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        BsDropdownModule.forRoot(),
        FormsModule
      ],
      declarations: [
        CardActionComponent,
        CardComponent,
        CardFilterComponent
      ],
      providers: [
        BsDropdownConfig
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CardComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        fixture.detectChanges();
      });
  }));

  it('should have a body', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-body'));
    expect(element.length).toBe(1);
  });

  it('should have a footer', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-footer'));
    expect(element.length).toBe(1);
  });

  it('should not have a footer', function() {
    config.filters = config.action = undefined;
    fixture.detectChanges();

    let element = fixture.debugElement.queryAll(By.css('.card-pf-footer'));
    expect(element.length).toBe(0);
  });

  it('should have a header', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-heading'));
    expect(element.length).toBe(1);
  });

  it('should have a top border', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-accented'));
    expect(element.length).toBe(1);
  });

  it('should not have a top border', function() {
    config.topBorder = false;
    fixture.detectChanges();

    let element = fixture.debugElement.queryAll(By.css('.card-pf-accented'));
    expect(element.length).toBe(0);
  });

  it('should have a title', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-title'));
    expect(element.length).toBe(1);
  });

  it('should have a sub-title', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-subtitle'));
    expect(element.length).toBe(1);
  });

  it('should not have a title border', function() {
    config.titleBorder = false;
    fixture.detectChanges();

    let element = fixture.debugElement.queryAll(By.css('.card-pf-heading'));
    expect(element.length).toBe(0);

    element = fixture.debugElement.queryAll(By.css('.pfng-card-heading-no-bottom'));
    expect(element.length).toBe(1);
  });

  it('should have a filter menu', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-time-frame-filter'));
    expect(element.length).toBe(1);
  });

  it('should call function when filter is selected', fakeAsync(function() {
    const element = fixture.nativeElement;

    let button = element.querySelector('.card-pf-time-frame-filter .dropdown-toggle');
    button.click();
    fixture.detectChanges(); // Workaround to fix dropdown tests
    tick();
    fixture.detectChanges();

    let elements = element.querySelectorAll('.card-pf-time-frame-filter .dropdown-item');
    expect(elements.length).toBe(3);

    let filter: CardFilter;
    comp.onFilterSelect.subscribe((data: CardFilter) => {
      filter = data;
    });

    elements[0].click();
    fixture.detectChanges();
    expect(filter).toBe(config.filters[0]);
  }));

  it('should have an action', function() {
    let element = fixture.debugElement.queryAll(By.css('.card-pf-link-with-icon'));
    expect(element.length).toBe(1);
  });

  it('should call function when an action is clicked', function(done) {
    let element = fixture.debugElement.query(By.css('.card-pf-link-with-icon'));
    expect(element).not.toBeNull();

    let action: CardAction;
    comp.onActionSelect.subscribe((data: CardAction) => {
      action = data;
      done();
    });

    element.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(action).toBe(config.action);
  });
});
