import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { CopyService } from '../copy-service/copy.service';
import { BlockCopyComponent } from './block-copy.component';

class MockedCopyService {}

describe('Block Copy Component - ', () => {

  let blockCopy: BlockCopyComponent;
  let fixture: ComponentFixture<BlockCopyComponent>;
  let componentConfig: any;
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
        expandToggleAriaLabel: 'Expand Block-level Foobar',
        tooltip: 'Block Copy Tooltip',
        value: 'Token'
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

  it('should ensure there is a single copy value container', () => {
    const numValueContainers = fixture.debugElement.queryAll(By.css('.pfng-block-copy-preview-txt-cont')).length;
    expect(numValueContainers).toBe(1);
  });

  it('should ensure there is a single copy button', () => {
    const numCopyBtns = fixture.debugElement.queryAll(By.css('.pfng-block-copy-btn')).length;
    expect(numCopyBtns).toBe(1);
  });

  it('should ensure there is a single expand button', () => {
    const numExpandBtns = fixture.debugElement.queryAll(By.css('.pfng-block-copy-preview-btn')).length;
    expect(numExpandBtns).toBe(1);
  });

  it('should ensure the label can be set', () => {
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    const label = fixture.debugElement.nativeElement.querySelector('.pfng-block-copy-label').textContent;
    expect(label).toBe(componentConfig.label);
  });

  it('should set the expand button aria label', () => {
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    const ariaLabel = fixture
                        .debugElement
                        .nativeElement
                        .querySelector('.pfng-block-copy-preview-btn')
                        .getAttribute('aria-label');
    expect(ariaLabel).toBe('Expand Block-level Foobar');
  });

  it('should set the aria expanded attribute when opened/closed', () => {
    let debugEl = fixture.debugElement,
      nativeEl = debugEl.nativeElement;
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    let ariaExpanded = nativeEl.querySelector('.pfng-block-copy-preview-btn').getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
    debugEl.query(By.css('.pfng-block-copy-preview-btn')).triggerEventHandler('click', null);
    fixture.detectChanges();
    ariaExpanded = nativeEl.querySelector('.pfng-block-copy-preview-btn').getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('true');
  });

  it('should set the tooltip text', () => {
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    const tooltipText = fixture
                          .debugElement
                          .query(By.css('.pfng-block-copy-preview-txt-cont'))
                          .nativeElement
                          .getAttribute('ng-reflect-tooltip');
    expect(tooltipText).toBe('Block Copy Tooltip');
  });

  it('should set the default tooltip placement', () => {
    (<any>Object).assign(blockCopy, componentConfig);
    fixture.detectChanges();
    const tooltipText = fixture
                          .debugElement
                          .query(By.css('.pfng-block-copy-preview-txt-cont'))
                          .nativeElement
                          .getAttribute('ng-reflect-placement');
    expect(tooltipText).toBe('top');
  });

  it('should set a custom tooltip placement', () => {
    (<any>Object).assign(blockCopy, componentConfig, {tooltipPlacement: 'bottom'});
    fixture.detectChanges();
    const tooltipText = fixture
                          .debugElement
                          .query(By.css('.pfng-block-copy-preview-txt-cont'))
                          .nativeElement
                          .getAttribute('ng-reflect-placement');
    expect(tooltipText).toBe('bottom');
  });
});
