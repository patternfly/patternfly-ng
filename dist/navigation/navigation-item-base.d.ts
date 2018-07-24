/**
 * A config containing properties for navigation items
 */
export declare class NavigationItemBase {
    /**
     * Badges to display information about the navigation item
     */
    badges?: any[];
    /**
     * The icon class to use for icons displayed to the left of text
     */
    iconStyleClass?: string;
    /**
     * Target for URL (e.g., _blank)
     */
    target?: string;
    /**
     * Title for the navigation item
     */
    title: string;
    /**
     * Link to navigate to
     */
    url?: string;
}
