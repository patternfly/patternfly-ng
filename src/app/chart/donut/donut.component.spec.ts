import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChartDefaults } from '../chart-defaults';
import { DonutConfig } from './donut-config';
import { DonutComponent } from './donut.component';
import { WindowReference } from '../../utilities/window.reference';

describe('Component: donut chart', () => {
  let comp: DonutComponent;
  let fixture: ComponentFixture<DonutComponent>;

  let config: DonutConfig;
  let chartData: any[];

  beforeEach(() => {
    chartData = [
      ['Cats', 2],
      ['Hamsters', 2],
      ['Dogs', 2]
    ];
    config = {
      chartId: 'testChart',
      data: {
        onclick: function(d: any, e: any) {}
      },
      donut: {
        title: 'Animals'
      }
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule],
      declarations: [DonutComponent],
      providers: [ChartDefaults, WindowReference]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DonutComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        comp.chartData = chartData;
        fixture.detectChanges();
      });
  }));

  it('should set chart id', () => {
    expect(comp.config.chartId).toContain('testChart');
  });

  it('should allow attribute specification of chart height', () => {
    config.chartHeight = 120;
    fixture.detectChanges();
    expect(comp.config.size.height).toBe(120);
  });

  it('should update when the chart height attribute changes', () => {
    config.chartHeight = 120;

    fixture.detectChanges();
    expect(comp.config.size.height).toBe(120);

    config.chartHeight = 100;
    fixture.detectChanges();
    expect(comp.config.size.height).toBe(100);
  });

  it('should setup C3 chart data correctly', () => {
    expect(comp.config.data.columns.length).toBe(3);
    expect(comp.config.data.columns[0][0]).toBe('Cats');
    expect(comp.config.data.columns[1][0]).toBe('Hamsters');
  });

  it('should update C3 chart data when data changes', () => {
    expect(comp.config.data.columns.length).toBe(3);
    expect(comp.config.data.columns[0][0]).toBe('Cats');
    expect(comp.config.data.columns[0][1]).toBe(2);

    chartData[0][1] = 3;
    fixture.detectChanges();

    expect(comp.config.data.columns[0][1]).toBe(3);
  });

  it('should setup onclick correctly', () => {
    expect(typeof(comp.config.data.onclick)).toBe('function');
  });

  it('should use the default centerLabel', () => {
    let centerLabel = comp.getCenterLabelText();
    expect(centerLabel.bigText).toBe(6);
    expect(centerLabel.smText).toBe('Animals');
  });

  it('should use custom centerLabel', () => {
    config.centerLabel = 'custom-label';
    fixture.detectChanges();

    let centerLabel = comp.getCenterLabelText();
    expect(centerLabel.bigText).toBe('custom-label');
    expect(centerLabel.smText).toBe('');
  });

  it('should use patternfly tooltip', () => {
    expect(typeof(comp.config.tooltip.contents)).toBe('function');
  });

  it('should have default donut config with custom title', () => {
    expect(comp.config.donut.title).toBe('Animals');

    expect(comp.config.donut.width).toBe(11);
    expect(comp.config.donut.label.show).toBe(false);
  });
});
