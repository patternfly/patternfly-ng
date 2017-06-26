import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '../../models/action';
import { ActionConfig } from '../../models/action-config';
import { EmptyStateConfig } from '../empty-state-config';
export declare class EmptyStateExampleComponent implements OnInit {
    private router;
    actionConfig: ActionConfig;
    actionsText: string;
    emptyStateConfig: EmptyStateConfig;
    constructor(router: Router);
    ngOnInit(): void;
    ngDoCheck(): void;
    handleAction($event: Action): void;
}
