import { OnInit } from "@angular/core";
import { Http } from '@angular/http';
export declare class IncludeContentComponent implements OnInit {
    private http;
    private templateUrl;
    private templateContent;
    private page;
    constructor(http: Http);
    ngOnInit(): void;
}
