import { ListConfigBase } from '../list-config-base';
/**
 * A config containing properties for tree list
 */
export declare class TreeListConfig extends ListConfigBase {
    /**
     * Indent children by the given value in pixels
     */
    indentChildren?: number;
    /**
     * For angular-tree-component options, see: https://angular2-tree.readme.io/docs
     */
    treeOptions?: any;
}
