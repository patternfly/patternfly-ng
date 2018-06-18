import { ListConfigBase } from '../list-config-base';

/**
 * A config containing properties for tree list
 *
 * @deprecated The tree-list component is deprecated due to issues with Angular 6 and mobx autorun,
 * introduced by angular-tree-component.
 *
 * See: https://github.com/patternfly/patternfly-ng/issues/381
 */
export class TreeListConfig extends ListConfigBase {
  /**
   * Indent children by the given value in pixels
   */
  indentChildren?: number;

  /**
   * For angular-tree-component options, see: https://angular2-tree.readme.io/docs
   */
  treeOptions?: any;
}
