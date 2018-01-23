import { Filter } from '../../filter/filter';
import { TableConfigBase } from '../table-config-base';
/**
 * An config containing properties for table
 */
export declare class TableConfig extends TableConfigBase {
    /**
     * A list of the currently applied filters
     */
    appliedFilters?: Filter[];
    /**
     * Enable drag and drop. Default is false
     */
    dragEnabled?: boolean;
    /**
     * Set to true to hide the close button in the expansion area. Default is false
     */
    hideClose?: boolean;
    /**
     * Custom CSS theme for underlying ngx-datatable
     */
    styleClass?: string;
    /**
     * Allow expansion for each row
     */
    useExpandRows?: boolean;
}
