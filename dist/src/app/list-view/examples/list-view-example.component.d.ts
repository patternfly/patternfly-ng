import { OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
export declare class ListViewExampleComponent implements OnInit {
    activeTab: string;
    constructor();
    ngOnInit(): void;
    ngDoCheck(): void;
    tabSelected($event: TabDirective): void;
}
