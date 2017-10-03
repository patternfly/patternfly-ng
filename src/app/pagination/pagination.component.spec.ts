import { TestBed, ComponentFixture, async } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

import { PaginationComponent } from "./pagination.component";
import { PaginationConfig } from "./pagination-config";

describe('Pagination component - ', () => {
  let comp: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let config: PaginationConfig;

  beforeEach(() => {
    config = {
      pageSize: 10,
      pageNumber: 1,
      numTotalItems: 125  //explicitly assigned
    } as PaginationConfig;
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PaginationComponent]
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

  it('should go to previous page', ()=>{
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

  it('should jump to first page', ()=>{
    comp.config.pageNumber = 6;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.goto-first-page'));
    button.triggerEventHandler('click',null);
    expect(comp.config.pageNumber).toEqual(1);
  });
});