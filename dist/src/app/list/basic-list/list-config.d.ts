import { ListBaseConfig } from '../list-base-config';
/**
 * A config containing properties for list view
 */
export declare class ListConfig extends ListBaseConfig {
    /**
     * Set to true to hide the close button in the expansion area. Default is false
     */
    hideClose?: boolean;
    /**
     * Allow expansion for each list item
     */
    useExpandItems?: boolean;
    /**
     * Show list heading. First object in items array is be used to define heading content
     */
    useHeading?: boolean;
}
