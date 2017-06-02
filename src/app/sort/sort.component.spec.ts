import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DropdownConfig, DropdownModule } from 'ng2-bootstrap';

import { SortComponent } from './sort.component';
import { SortConfig } from './sort-config';
import { SortEvent } from './sort-event';

describe('Sort component - ', () => {
  let comp: SortComponent;
  let fixture: ComponentFixture<SortComponent>;
  let config: SortConfig;

  beforeEach(() => {
    config = {
      fields: [
        {
          id: 'name',
          title:  'Name',
          sortType: 'alpha'
        },
        {
          id: 'age',
          title:  'Age',
          sortType: 'numeric'
        },
        {
          id: 'address',
          title:  'Address',
          sortType: 'alpha'
        },
        {
          id: 'birthMonth',
          title:  'Birth Month',
          sortType: 'alpha'
        }
      ]
    } as SortConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, DropdownModule],
      declarations: [SortComponent],
      providers: [DropdownConfig]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SortComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        fixture.detectChanges();
      });
  }));

  it('should have correct number of sort fields', () => {
    let elements = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));
    expect(elements.length).toBe(4);
  });

  it('should have default to the first sort field', () => {
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
  });

  it('should default to ascending sort', function () {
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));
    expect(sortIcon).not.toBeNull();
  });

  it('should update the current sort when one is selected', function () {
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    let fields = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));

    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
    expect(fields.length).toBe(4);

    fields[2].triggerEventHandler('click', {});
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    expect(results.nativeElement.textContent.trim().slice(0, 'Address'.length))
      .toBe('Address');
  });

  it('should update the direction icon when the sort type changes', function () {
    let results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    let fields = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));

    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Name'.length)).toBe('Name');
    expect(fields.length).toBe(4);
    expect(sortIcon).not.toBeNull();

    fields[1].triggerEventHandler('click', {});
    fixture.detectChanges();

    results = fixture.debugElement.query(By.css('.sort-pf .dropdown-toggle'));
    sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-numeric-asc'));
    expect(results).not.toBeNull();
    expect(results.nativeElement.textContent.trim().slice(0, 'Age'.length)).toBe('Age');
    expect(sortIcon).not.toBeNull();

  });

  it('should reverse the sort direction when the direction button is clicked', function () {
    let sortButton = fixture.debugElement.query(By.css('.sort-pf .btn.btn-link'));
    let sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-asc'));
    expect(sortButton).not.toBeNull();
    expect(sortIcon).not.toBeNull();

    sortButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    sortIcon = fixture.debugElement.query(By.css('.sort-pf .fa-sort-alpha-desc'));
    expect(sortIcon).not.toBeNull();
  });

  it ('should notify when a new sort field is chosen', function(done) {
    let fields = fixture.debugElement.queryAll(By.css('.sort-pf .sort-field'));

    comp.onChange.subscribe((data: SortEvent) => {
      expect(data.field).toBe(config.fields[1]);
      done();
    });

    expect(fields.length).toBe(4);

    fields[1].triggerEventHandler('click', {});
    fixture.detectChanges();
  });

  it ('should notify when the sort direction changes', function(done) {

    let sortButton = fixture.debugElement.query(By.css('.sort-pf .btn.btn-link'));

    comp.onChange.subscribe((data: SortEvent) => {
      expect(data.isAscending).toBe(false);
      done();
    });

    expect(sortButton).not.toBeNull();

    sortButton.triggerEventHandler('click', {});
    fixture.detectChanges();
  });
});
