import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DonutConfig } from './donut-config';
import { DonutComponent } from './donut.component';
import { ChartDefaults } from '../chart.defaults';

describe('Component: donut chart', () => {

  let comp: DonutComponent;
  let fixture: ComponentFixture<DonutComponent>;

  let config: DonutConfig;
  let data: any;

  beforeEach(() => {
    config = {
      'chartId': 'testDonutChart',
      data: {},
      onClickFn: function(d: any, e: any) {
      },
      centerLabel: 'center'
    };
    data = [
      ['Cats', 2],
      ['Hamsters', 2],
      ['Dogs', 2]
    ];
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule],
      declarations: [DonutComponent],
      providers: [ChartDefaults]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DonutComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        comp.chartData = data;
        fixture.detectChanges();
      });
  }));


  it('should allow attribute specification of chart height', () => {
    config.chartHeight = 120;
    fixture.detectChanges();
    expect(comp.config.size.height).toBe(120);
  });

  it('should update when the chart height attribute changes', () => {
    config.chartHeight = 120;

    fixture.detectChanges();
    expect(comp.donutChartId).toBe('testDonutChartdonutChart');
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

    data[0][1] = 3;
    fixture.detectChanges();

    expect(comp.config.data.columns[0][1]).toBe(3);
  });

  it('should setup onclick correctly', () => {
    expect(typeof(comp.config.data.onclick)).toBe('function');
  });
});
