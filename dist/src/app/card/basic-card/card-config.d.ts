import { CardAction } from '../card-action/card-action';
import { CardBaseConfig } from '../card-base-config';
import { CardFilter } from '../card-filter/card-filter';
/**
 * A config containing properties for card
 */
export declare class CardConfig extends CardBaseConfig {
    /**
     * An action shown in the footer
     */
    action?: CardAction;
    /**
     * The time frame filter position; "header" or "footer"
     */
    filterPosition?: string;
    /**
     * A list of time frame filters
     */
    filters?: CardFilter[];
    /**
     * Omit padding for customization
     */
    noPadding: boolean;
    /**
     * Sub-Title for the card
     */
    subTitle?: string;
}
