import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SparklineConfig } from './sparkline-config';
import { SparklineComponent } from './sparkline.component';
import { ChartDefaults } from '../chart.defaults';

describe('Component: sparkline chart', () => {

  let comp: SparklineComponent;
  let fixture: ComponentFixture<SparklineComponent>;

  let config: SparklineConfig;
  let data: any;

  beforeEach(() => {
    config = {
      'chartId': 'testSparklineChart',
      'units': 'MHz',
      data: {}
    };

    let today = new Date();
    let dates: any = ['dates'];
    for (let d = 20 - 1; d >= 0; d--) {
      dates.push(new Date(today.getTime() - (d * 24 * 60 * 60 * 1000)));
    }

    data = {
      'total': '100',
      'yData': ['used', '10', '20', '30', '20', '30', '10', '14', '20', '25', '68', '54', '56', '78', '56', '67', '88', '76', '65', '87', '76'],
      'xData': dates
    };
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule],
      declarations: [SparklineComponent],
      providers: [ChartDefaults]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(SparklineComponent);
        comp = fixture.componentInstance;
        comp.config = config;
        comp.chartData = data;
        fixture.detectChanges();
      });
  }));

  it('should not show axis by default', () => {
    let elements = fixture.debugElement.queryAll(By.css('#testSparklineChartsparklineChart'));
    expect(elements.length).toBe(1);

    expect(comp.sparklineChartId).toBe('testSparklineChartsparklineChart');
    expect(comp.config.axis.x.show).toBe(false);
    expect(comp.config.axis.y.show).toBe(false);
  });

  it('should allow attribute specifications to show x and y axis', () => {
    config.showXAxis = true;
    config.showYAxis = true;

    fixture.detectChanges();

    expect(comp.sparklineChartId).toBe('testSparklineChartsparklineChart');
    expect(comp.config.axis.x.show).toBe(true);
    expect(comp.config.axis.y.show).toBe(true);
  });

  it('should update when the show x and y axis attributes change', () => {
    config.showXAxis = false;
    config.showYAxis = false;
    fixture.detectChanges();

    expect(comp.config.axis.x.show).toBe(false);
    expect(comp.config.axis.y.show).toBe(false);

    config.showXAxis = true;
    config.showYAxis = true;
    fixture.detectChanges();

    expect(comp.config.axis.x.show).toBe(true);
    expect(comp.config.axis.y.show).toBe(true);
  });

  it('should allow attribute specification of chart height', () => {
    config.chartHeight = 120;
    fixture.detectChanges();
    expect(comp.config.size.height).toBe(120);
  });

  it('should update when the chart height attribute changes', () => {
    config.chartHeight = 120;

    fixture.detectChanges();
    expect(comp.sparklineChartId).toBe('testSparklineChartsparklineChart');
    expect(comp.config.size.height).toBe(120);

    config.chartHeight = 100;
    fixture.detectChanges();
    expect(comp.config.size.height).toBe(100);
  });


  it('should setup C3 chart data correctly', () => {
    expect(comp.config.data.x).toBe('dates');
    expect(comp.config.data.columns.length).toBe(2);
    expect(comp.config.data.columns[0][0]).toBe('dates');
    expect(comp.config.data.columns[1][0]).toBe('used');
  });

  it('should update C3 chart data when data changes', () => {
    expect(comp.config.data.x).toBe('dates');
    expect(comp.config.data.columns.length).toBe(2);
    expect(comp.config.data.columns[0][1].toString()).toBe(data.xData[1].toString());
    expect(comp.config.data.columns[1][1]).toBe('10');

    let now = new Date();
    data.xData[1] = now;
    data.yData[1] = '1000';

    fixture.detectChanges();

    expect(comp.config.data.columns[0][1].toString()).toBe(now.toString());
    expect(comp.config.data.columns[1][1]).toBe('1000');
  });

  it('should allow tooltip type specification', function() {
    config.tooltipType = 'percentage';
    fixture.detectChanges();
    expect(comp.config.tooltipType).toBe('percentage');
  });

  it('should allow using a tooltip function', () => {
    let functionCalled = false;
    let myTooltipFn = function(d) {
      if (d && d.length === 2) {
        functionCalled = true;
      }
    };

    config.tooltipFn = myTooltipFn;
    fixture.detectChanges();

    let dataPoint = [{ value: 0, name: 'used' }, 0];
    comp.sparklineTooltip().contents(dataPoint);
    expect(functionCalled).toBe(true);
  });

  it('should allow using C3 chart data formats', () => {
    config = {
      chartId: 'testSparklineChart',
      units: 'MHz',
      data: {
        xFormat: '%Y-%m-%d %H:%M:%S',
        x: 'dates',
        columns: [data.xData, data.yData]
      }
    };
    data = {
      total: 100
    };

    expect(comp.config.data.x).toBe('dates');
    expect(comp.config.data.columns.length).toBe(2);
    expect(comp.config.data.columns[0][0]).toBe('dates');
    expect(comp.config.data.columns[1][0]).toBe('used');
  });

  // TODO - add when empty chart is available
  // it("should show empty chart when the dataAvailable is set to false", function() {
  //   element = compileChart('<pf-sparkline-chart config="config" chart-data="data"></pf-sparkline-chart>', $scope);
  //   let emptyChart = element.find('.empty-chart-content');
  //   expect(emptyChart.length).toBe(0);
  //
  //   $scope.data.dataAvailable = false;
  //
  //   $scope.$digest();
  //
  //   emptyChart = element.find('.empty-chart-content');
  //   expect(emptyChart.length).toBe(1);
  // });

});
