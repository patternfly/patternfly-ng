import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PaginationComponent } from './pagination.component';
import { PaginationConfig } from './pagination-config';

describe('Pagination component - ', () => {
  let comp: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let config: PaginationConfig;

  beforeEach(() => {
    config = {
      pageSize: 10,
      pageNumber: 1,
      pageSizeIncrements: [5, 10, 20, 40, 80, 100],
      totalItems: 125  // explicitly assigned
    } as PaginationConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BsDropdownModule.forRoot()],
      declarations: [ PaginationComponent ],
      providers: [ BsDropdownConfig ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PaginationComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        fixture.detectChanges();
      });
  }));

  it('should go to next page', () => {
    let button = fixture.debugElement.query(By.css('.goto-next-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.pageNumber).toEqual(2);
  });

  it('should go to previous page', () => {
    comp.config.pageNumber = 5;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.goto-prev-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.pageNumber).toEqual(4);
  });

  it('should jump to last page', () => {
    let button = fixture.debugElement.query(By.css('.goto-last-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.pageNumber).toEqual(comp.lastPageNumber);
  });

  it('should jump to first page', () => {
    comp.config.pageNumber = 6;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.goto-first-page'));
    button.triggerEventHandler('click', null);
    expect(comp.config.pageNumber).toEqual(1);
  });

  it('should change page Size', fakeAsync(() => {
    const element = fixture.nativeElement;

    let button = element.querySelector('button');
    button.click();
    tick();
    fixture.detectChanges(); // Workaround to fix dropdown tests

    expect(element.querySelector('[dropdown]').classList).toContain('open');

    // click on menu option with value 20
    let item = element.querySelectorAll('ul.dropdown-menu > li > a');
    item[2].click();
    fixture.detectChanges();

    expect(element.querySelector('[dropdown]').classList).not.toContain('open');
    expect(comp.config.pageSize).toEqual(20);
  }));

  it('should call the method "onPageNumberKeyup" on Enter key to change page by using input', () => {
    spyOn(comp, 'onPageNumberKeyup');
    let input = fixture.debugElement.query(By.css('input.pagination-pf-page'));
    input.nativeElement.value = 6;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('keyup.enter', null);
    expect(comp.onPageNumberKeyup).toHaveBeenCalled();
  });

  it('should change the page on blur by using input', () => {
    let input = fixture.debugElement.query(By.css('input.pagination-pf-page'));
    input.nativeElement.value = 6;
    input.nativeElement.dispatchEvent(new Event('input'));
    input.triggerEventHandler('blur', null);
    expect(comp.config.pageNumber).toBe(6);
  });
});

