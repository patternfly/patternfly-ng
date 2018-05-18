import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from '../copy-service/copy.service';
import { InlineCopyComponent } from './inline-copy.component';
import { Component } from '@angular/core';

class MockedCopyService {
  copy() {
    return true;
  }
}

interface ComponentConfig {
  copyValue: string;
  ariaLabel: string;
  buttonLabel?: string;
}

fdescribe('Inline Copy Component - ', () => {

  let inlineCopy: InlineCopyComponent;
  let fixture: ComponentFixture<InlineCopyComponent>;
  let componentConfig: ComponentConfig;
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
        ariaLabel: 'Foobar',
        copyValue: 'Test String'
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
    const numCopyValueContainers = fixture.debugElement.queryAll(By.css('.pfng-inline-copy-value-cont')).length;
    expect(numCopyValueContainers).toBe(1);
  });

  it('should find a single copy button', () => {
    const numCopyBtns = fixture.debugElement.queryAll(By.css('.pfng-inline-copy-btn')).length;
    expect(numCopyBtns).toBe(1);
  });

  it('should set the tooltip text', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const tooltipText = fixture.debugElement.query(By.css('.pfng-inline-copy-value-cont')).nativeElement.getAttribute('tooltip');
    expect(tooltipText).toBe('Foobar');
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
    expect(ariaLabel).toBe(`Copy ${componentConfig.ariaLabel}`);
  });

  it('should incorporate button txt into its aria-label', () => {
    const btnTxt = 'Grab';
    (<any>Object).assign(inlineCopy, componentConfig, {buttonLabel: btnTxt});
    fixture.detectChanges();
    const ariaLabel = fixture.debugElement.children[0].children[1].attributes['aria-label'];
    expect(ariaLabel).toBe(`${btnTxt} ${inlineCopy.ariaLabel}`);
  });

  it('should throw error without an aria label', () => {
    (<any>Object).assign({ariaLabel: null}, inlineCopy, componentConfig);
    expect(() => {
      fixture.detectChanges();
    }).toThrow(new Error('Missing required @Input property \'ariaLabel\''));
  });

  it('should emit a copiedToClipboard event', () => {
    const spy = spyOn(inlineCopy.copiedToClipboard, 'emit');
    (<any>Object).assign(inlineCopy, componentConfig);
    inlineCopy.copiedToClipboard.subscribe(eventResponse => {
      expect(spy).toHaveBeenCalled();
      expect(eventResponse).toBe(`${inlineCopy.ariaLabel} copied!`);
    });
    const copyBtn = fixture.debugElement.query(By.css('.pfng-inline-copy-btn'));
    copyBtn.triggerEventHandler('click', null);
  });

});
