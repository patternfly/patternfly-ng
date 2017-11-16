import {
  Component,
  Input,
  OnInit,
  DoCheck,
  ViewEncapsulation
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { InfoStatusCardConfig } from './info-status-card-config';

/**
 * Info Status Card Component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-info-status-card',
  styleUrls: ['./info-status-card.component.less'],
  templateUrl: './info-status-card.component.html'

})

export class InfoStatusCardComponent implements OnInit, DoCheck {

  /**
   * The config object containing component properties
   */
  @Input('config') config: InfoStatusCardConfig;

  private defaultConfig: InfoStatusCardConfig = {
    showTopBorder: false,
    htmlContent: true
  };

  private prevConfig: InfoStatusCardConfig;

  /**
   * The default constructor
   */
  constructor() {}

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   *  Check if any component config props have changed
   */
  ngDoCheck(): void {
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  /**
   * Set up default config
   */
  protected setupConfig(): void {

    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }

    this.prevConfig = cloneDeep(this.config);
  }

}
