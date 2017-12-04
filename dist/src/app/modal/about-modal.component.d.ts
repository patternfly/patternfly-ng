import { DoCheck, EventEmitter, OnInit } from '@angular/core';
import { AboutModalConfig } from './about-modal-config';
/**
 * Component for rendering AboutModal
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
