import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
/**
 * Drag and drop directive used with the underlying ngx-datatable component.
 *
 * Note: When drag and drop is avaiable upstream, this functionlity will likely be removed
 *
 * See: https://github.com/swimlane/ngx-datatable/issues/411
 */
export declare class NgxDataTableDndDirective implements AfterViewInit, OnChanges, OnDestroy, OnInit {
    dragulaName: string;
    dragulaModel: any;
    dragulaClassSelector: string;
    dragulaDrop: EventEmitter<any>;
    dragulaDrag: EventEmitter<any>;
    subscriptionDrag: any;
    subscriptionDrop: any;
    protected container: any;
    private drake;
    private el;
    private dragulaService;
    constructor(el: ElementRef, dragulaService: DragulaService);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: {
        dragulaModel?: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    protected initializeDragula(): void;
    private checkModel;
    private drag;
    private onDropModel;
}
