import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { AboutModalConfig } from './about-modal-config';
/**
 * About Modal component
 *
 * Usage:
 * <code><pre>
 * // Individual module import
 * import { AboutModalModule } from 'patternfly-ng/modal';
 * // Or
 * import { AboutModalModule } from 'patternfly-ng';
 *
 * // NGX Bootstrap
 * import { ModalModule } from 'ngx-bootstrap/modal';
 *
 * &#64;NgModule({
 *   imports: [AboutModalModule, ModalModule.forRoot(),...]
 * })
 * export class AppModule(){}
 * </pre></code>
 *
 * Optional:
 * <code><pre>
 * import { AboutModalConfig, AboutModalEvent } from 'patternfly-ng/modal';
 * </pre></code>
 */
export declare class AboutModalComponent implements DoCheck, OnInit {
    /**
     * The AboutModal config contaning component properties
     */
    config: AboutModalConfig;
    /**
     * The Event is emitted when modal is closed
     */
    onCancel: EventEmitter<{}>;
    private defaultConfig;
    private prevConfig;
    /**
     * The default contructor
     */
    constructor();
    /**
     * Setup component configuration upon initialization
     */
    ngOnInit(): void;
    /**
     * Check if the component config has changed
     */
    ngDoCheck(): void;
    /**
     * Setup default config
     */
    protected setupConfig(): void;
    /**
     * Close the Modal
     * @param  $event MouseEvent to emit
     */
    close(): void;
}
