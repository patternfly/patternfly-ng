import { OnInit } from '@angular/core';
import { Action } from '../../action/action';
import { ActionConfig } from '../../action/action-config';
export declare class ActionExampleComponent implements OnInit {
    actionConfig: ActionConfig;
    actionsText: string;
    constructor();
    ngOnInit(): void;
    doAdd(): void;
    handleAction(action: Action): void;
    optionSelected(option: number): void;
}
