import { Pipe, PipeTransform } from '@angular/core';

/**
 * Truncate pipe
 *
 * This is currently used with the save filter feature of the filter fields component
 */
@Pipe({ name: 'Truncate'})
export class TruncatePipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    let limit = (args && args.length > 0) ? parseInt(args[0], 10) : 10;
    let trail = (args && args.length > 1) ? args[1] : '...';

    return (value.length > limit) ? value.substring(0, limit) + trail : value;
  }
}
