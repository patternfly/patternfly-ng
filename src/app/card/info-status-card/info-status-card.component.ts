import {
  Component,
  Input,
  OnInit,
  DoCheck
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { InfoStatusCardConfig } from './info-status-card-config';

/**
 * Info Status Card Component
 */
@Component({
  selector: 'pfng-info-status-card',
  templateUrl: './info-status-card.component.html',
  styleUrls: ['./info-status-card.component.less']
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
