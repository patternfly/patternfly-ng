import { OnInit } from '@angular/core';
export declare class RemainingCharsExampleComponent implements OnInit {
    charsMaxLimitExceeded: any;
    constructor();
    ngOnInit(): void;
    /**
     * Handle over chars max limit event
     *
     * @param $event The number of remaining chars
     */
    handleOverCharsMaxLimit($event: number, id: string): void;
    /**
     * Handle under chars max limit event
     *
     * @param $event The number of remaining chars
     */
    handleUnderCharsMaxLimit($event: number, id: string): void;
}
