import {
  async,
  fakeAsync,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from '../copy-service/copy.service';
import { BlockCopyComponent } from './block-copy.component';
import { Component } from '@angular/core';

class MockedCopyService {}

interface ComponentConfig {
  label: string;
  token: string;
  copyBtnTxt?: string;
  tokenPanelOpen?: boolean;
}

describe('Block Copy Component - ', () => {

  let blockCopy: BlockCopyComponent;
  let fixture: ComponentFixture<BlockCopyComponent>;
  let componentConfig: ComponentConfig;
  let copyService: MockedCopyService;

  beforeEach(async(() => {
    copyService = new MockedCopyService();

    TestBed.configureTestingModule({
      declarations: [BlockCopyComponent],
      imports: [TooltipModule.forRoot()],
      providers: [{ provide: CopyService, useValue: copyService }]
    })
    .compileComponents()
    .then(() => {
      componentConfig = {
        label: 'Block-level Foobar',
        token: 'Token'
      };
    })
    .then(() => {
      fixture = TestBed.createComponent(BlockCopyComponent);
      blockCopy = fixture.componentInstance;
    });

  }));

  afterEach(() => {
    blockCopy = null;
    fixture = null;
    componentConfig = null;
    copyService = null;
  });

  it('should have a valid fixture', () => {
    expect(fixture).toBeTruthy();
  });

  it('should test that blockCopy is an instance of the block copy component', () => {
    expect(blockCopy instanceof BlockCopyComponent).toBeTruthy();
  });

  it('should ensure there is a single token container', () => {
    const numTokenContainers = fixture.debugElement.queryAll(By.css('.copy-preview-txt-cont')).length;
    expect(numTokenContainers).toBe(1);
  });

  it('should ensure there is a single copy button', () => {
    const numCopyBtns = fixture.debugElement.queryAll(By.css('.copy-btn')).length;
    expect(numCopyBtns).toBe(1);
  });

  it('should ensure there is a single expand button', () => {
    const numExpandBtns = fixture.debugElement.queryAll(By.css('.copy-preview-btn')).length;
    expect(numExpandBtns).toBe(1);
  });

  it('should ensure the label can be set', () => {
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    const label = fixture.debugElement.nativeElement.querySelector('label').textContent;
    expect(label).toBe(componentConfig.label);
  });

  it('should set the expand button aria label', () => {
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    const ariaLabel = fixture.debugElement.nativeElement.querySelector('.copy-preview-btn').getAttribute('aria-label');
    expect(ariaLabel).toBe(`Expand ${componentConfig.label} Container`);
  });

  it('should set the aria expanded attribute when opened/closed', () => {
    let debugEl = fixture.debugElement,
      nativeEl = debugEl.nativeElement;
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    let ariaExpanded = nativeEl.querySelector('.copy-preview-btn').getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
    debugEl.query(By.css('.copy-preview-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    ariaExpanded = nativeEl.querySelector('.copy-preview-btn').getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('true');
  });

});
