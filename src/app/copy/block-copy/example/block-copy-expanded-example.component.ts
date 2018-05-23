import {
  Component,
  ViewEncapsulation
} from '@angular/core';

import { BlockCopyConfig } from '../block-copy-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'block-copy-expanded-example',
  templateUrl: './block-copy-expanded-example.component.html'
})
export class BlockCopyExpandedExampleComponent {

  expandedEx01: BlockCopyConfig = {
    label: 'GraphQL Query',
    buttonLabel: 'Copy Query',
    expandBtnAriaLabel: 'Toggle GraphQL Query',
    copyBtnAriaLabel: 'Copy GraphQl Query',
    copyValue: 'query HeroNameAndFriends($episode: Episode) {hero(episode: $episode) {name friends {name}}}',
    expanded: true
  };

  constructor() {}
}
