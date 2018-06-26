import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from '../copy-service/copy.service';
import { InlineCopyComponent } from './inline-copy.component';

class MockedCopyService {
  copy() {
    return true;
  }
}

describe('Inline Copy Component - ', () => {

  let inlineCopy: InlineCopyComponent;
  let fixture: ComponentFixture<InlineCopyComponent>;
  let componentConfig: any;
  let copyService: MockedCopyService;

  beforeEach(async(() => {
    copyService = new MockedCopyService();

    TestBed.configureTestingModule({
      declarations: [InlineCopyComponent],
      imports: [TooltipModule.forRoot()],
      providers: [{ provide: CopyService, useValue: copyService }]
    })
    .compileComponents()
    .then(() => {
      componentConfig = {
        copyBtnAriaLabel: 'Foobar',
        copyValue: 'Test String',
        tooltip: 'Test tooltip'
      };
    })
    .then(() => {
      fixture = TestBed.createComponent(InlineCopyComponent);
      inlineCopy = fixture.componentInstance;
    });

  }));

  afterEach(() => {
    inlineCopy = null;
    fixture = null;
    componentConfig = null;
    copyService = null;
  });

  it('should have a valid fixture', () => {
    expect(fixture).toBeTruthy();
  });

  it('should test that inlineCopy is an instance of the inline copy component', () => {
    expect(inlineCopy instanceof InlineCopyComponent).toBeTruthy();
  });

  it('should find a single copyValue container element', () => {
    const numCopyValueContainers = fixture.debugElement.queryAll(By.css('.pfng-inline-copy-txt-cont')).length;
    expect(numCopyValueContainers).toBe(1);
  });

  it('should find a single copy button', () => {
    const numCopyBtns = fixture.debugElement.queryAll(By.css('.pfng-inline-copy-btn')).length;
    expect(numCopyBtns).toBe(1);
  });

  it('should set the tooltip text', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const tooltipText = fixture
                          .debugElement
                          .query(By.css('.pfng-inline-copy-txt-cont'))
                          .nativeElement
                          .getAttribute('ng-reflect-tooltip');
    expect(tooltipText).toBe('Test tooltip');
  });

  it('should set the default tooltip placement', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const tooltipText = fixture
                          .debugElement
                          .query(By.css('.pfng-inline-copy-txt-cont'))
                          .nativeElement
                          .getAttribute('ng-reflect-placement');
    expect(tooltipText).toBe('top');
  });

  it('should set a custom tooltip placement', () => {
    (<any>Object).assign(inlineCopy, componentConfig, {tooltipPlacement: 'right'});
    fixture.detectChanges();
    const tooltipPlacement = fixture
                          .debugElement
                          .query(By.css('.pfng-inline-copy-txt-cont'))
                          .nativeElement
                          .getAttribute('ng-reflect-placement');
    expect(tooltipPlacement).toBe('right');
  });

  it('should set the copyValue container text node', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const copyValueText = fixture.debugElement.children[0].nativeElement.innerText;
    expect(copyValueText).toContain('Test String');
  });

  it('should set the copy button aria label', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const ariaLabel = fixture.debugElement.children[0].children[1].attributes['aria-label'];
    expect(ariaLabel).toBe(`${componentConfig.copyBtnAriaLabel}`);
  });

  it('should emit a copiedToClipboard event', () => {
    const spy = spyOn(inlineCopy.copiedToClipboard, 'emit');
    (<any>Object).assign(inlineCopy, componentConfig);
    inlineCopy.copiedToClipboard.subscribe(eventResponse => {
      expect(spy).toHaveBeenCalled();
      expect(eventResponse).toBe(`${inlineCopy.copyBtnAriaLabel} copied`);
    });
    const copyBtn = fixture.debugElement.query(By.css('.pfng-inline-copy-btn'));
    copyBtn.triggerEventHandler('click', null);
  });

});
