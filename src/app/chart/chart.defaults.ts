import { Injectable } from '@angular/core';

@Injectable()
export class ChartDefaults {

  private patternflyDefaults: any = (window as any).patternfly.c3ChartDefaults();

  public getDefaultColors = this.patternflyDefaults.getDefaultColors;
  public getDefaultDonut = this.patternflyDefaults.getDefaultDonut;
  public getDefaultDonutSize =  this.patternflyDefaults.getDefaultDonutSize;
  public getDefaultDonutColor = this.patternflyDefaults.getDefaultDonutColors;
  public getDefaultDonutLegend = this.patternflyDefaults.getDefaultDonutLegend;
  public getDefaultDonutConfig = this.patternflyDefaults.getDefaultDonutConfig;
  public getDefaultSparklineArea = this.patternflyDefaults.getDefaultSparklineArea;
  public getDefaultSparklineSize = this.patternflyDefaults.getDefaultSparklineSize;
  public getDefaultSparklineAxis = this.patternflyDefaults.getDefaultSparklineAxis;
  public getDefaultSparklineColor = this.patternflyDefaults.getDefaultColors;
  public getDefaultSparklineLegend = this.patternflyDefaults.getDefaultSparklineLegend;
  public getDefaultSparklinePoint = this.patternflyDefaults.getDefaultSparklinePoint;
  public getDefaultSparklineTooltip = this.patternflyDefaults.getDefaultSparklineTooltip;
  public getDefaultSparklineConfig = this.patternflyDefaults.getDefaultSparklineConfig;
  public getDefaultLineConfig = this.patternflyDefaults.getDefaultLineConfig;

  constructor() {
  }
}

