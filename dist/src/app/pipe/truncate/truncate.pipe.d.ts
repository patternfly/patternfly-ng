import { PipeTransform } from '@angular/core';
/**
 * Truncate pipe
 *
 * This is currently used with the save filter feature of the filter fields component
 */
export declare class TruncatePipe implements PipeTransform {
    transform(value: string, args: string[]): string;
}
