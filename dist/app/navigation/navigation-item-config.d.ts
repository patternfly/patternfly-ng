/**
 * A config containing properties for navigation items
 */
export declare class NavigationItemConfig {
    /**
     * Title for the navigation item
     */
    title: string;
    /**
     * The icon class to use for icons displayed to the left of text
     */
    iconStyleClass?: string;
    /**
     * Link to navigate to
     */
    url?: string;
    /**
     * Badges to display information about the navigation item
     */
    badges?: any[];
    /**
     * Navigation children (used for secondary and tertiary navigation)
     */
    children?: NavigationItemConfig[];
    /**
     * Indicate if the item should be active on load
     */
    activeOnLoad?: boolean;
    /**
     * Track the active state of the navigation item
     */
    trackActiveState?: boolean;
    /**
     * Track the hover state of the navigation item
     */
    trackHoverState?: boolean;
    /**
     * Indicates if the child secondary menu is opened
     */
    secondaryCollapsed?: boolean;
    /**
     * Indicates if the child tertiary menu is opened
     */
    tertiaryCollapsed?: boolean;
    /**
     * Indicates if this is a mobile item
     */
    mobileItem?: boolean;
    /**
     * Internal variable used for hovering timeout
     */
    hoverTimeout?: any;
    /**
     * Internal variable used for blur timeout
     */
    blurTimeout?: any;
}
