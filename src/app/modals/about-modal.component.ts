import {
  Component,
  DoCheck,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewEncapsulation,
  OnInit
} from '@angular/core';

import { cloneDeep, defaults, isEqual } from 'lodash';

import { AboutModalConfig } from './about-modal-config';

/**
 * Component for rendering AboutModal
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'pfng-about-modal',
  templateUrl: './about-modal.component.html'
})

export class AboutModalComponent implements DoCheck, OnInit {

  /**
   * The AboutModal config contaning component properties
   */
  @Input() config: AboutModalConfig;

  /**
   * Modal Template for custom content
   */
  @Input() template: TemplateRef<any>;

  /**
   * The Event is emitted when modal is closed
   */
  @Output('onCancel') onCancel = new EventEmitter();

  private defaultConfig= {
    isOpen: false
  } as AboutModalConfig;
  private prevConfig: AboutModalConfig;

  /**
   * The default contructor
   */
  constructor() { }

  // Initialization

  /**
   *  Setup component configuration upon initialization
   */
  ngOnInit(): void {
    this.setupConfig();
  }

  /**
   *  Check if the component config has changed
   */
  ngDoCheck(): void {
    // Do a deep compare on config
    if (!isEqual(this.config, this.prevConfig)) {
      this.setupConfig();
    }
  }

  /**
   * Setup default config
   */
  protected setupConfig(): void {
    if (this.config !== undefined) {
      defaults(this.config, this.defaultConfig);
    } else {
      this.config = cloneDeep(this.defaultConfig);
    }
    this.prevConfig = cloneDeep(this.config);
  }

  /**
   * Close the Modal
   * @param  $event MouseEvent to emit
   */
  close($event: MouseEvent): void {
    this.onCancel.emit($event);
  }
}

