import { ListBaseConfig } from '../list-base-config';
/**
 * A config containing properties for tree list
 */
export declare class TreeListConfig extends ListBaseConfig {
    /**
     * Indent children by the given value in pixels
     */
    indentChildren?: number;
    /**
     * For angular-tree-component options, see: https://angular2-tree.readme.io/docs
     */
    treeOptions?: any;
}
