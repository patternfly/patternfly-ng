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
  token: string;
  label: string;
  copyBtnTxt?: string;
}

describe('Inline Copy Component - ', () => {

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
        label: 'Foobar',
        token: 'Test Token'
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

  it('should find a single token container element', () => {
    const numTokenContainers = fixture.debugElement.queryAll(By.css('.token-cont')).length;
    expect(numTokenContainers).toBe(1);
  });

  it('should find a single copy button', () => {
    const numCopyBtns = fixture.debugElement.queryAll(By.css('.copy-btn')).length;
    expect(numCopyBtns).toBe(1);
  });

  it('should set the token container tooltip and text node', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const tokenText = fixture.debugElement.children[0].nativeElement.innerText;
    const tooltipText = fixture.debugElement.nativeElement.children[0].children[0].attributes[3].nodeValue;
    expect(tooltipText).toBe('Foobar');
    expect(tokenText).toContain('Test Token');
  });

  it('should set the copy button aria label', () => {
    (<any>Object).assign(inlineCopy, componentConfig);
    fixture.detectChanges();
    const ariaLabel = fixture.debugElement.children[0].children[1].attributes['aria-label'];
    expect(ariaLabel).toBe(`Copy ${componentConfig.label}`);
  });

  it('should incorporate button txt into its aria-label', () => {
    const btnTxt = 'Grab';
    (<any>Object).assign(inlineCopy, componentConfig, {copyBtnTxt: btnTxt});
    fixture.detectChanges();
    const ariaLabel = fixture.debugElement.children[0].children[1].attributes['aria-label'];
    expect(ariaLabel).toBe(`${btnTxt} ${inlineCopy.label}`);
  });

  it('should throw error without a label', () => {
    (<any>Object).assign({label: null}, inlineCopy, componentConfig);
    expect(() => {
      fixture.detectChanges();
    }).toThrow(new Error('Missing required @Input property \'label\''));
  });

  it('should emit a copiedToClipboard event', () => {
    const spy = spyOn(inlineCopy.copiedToClipboard, 'emit');
    (<any>Object).assign(inlineCopy, componentConfig);
    inlineCopy.copiedToClipboard.subscribe(token => {
      expect(spy).toHaveBeenCalled();
      expect(token).toBe(`${inlineCopy.label} copied!`);
    });
    const copyBtn = fixture.debugElement.query(By.css('.copy-btn'));
    copyBtn.triggerEventHandler('click', null);
  });

});
