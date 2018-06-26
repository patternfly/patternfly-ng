import {
  Component,
  ViewEncapsulation
} from '@angular/core';
import {CopyEvent} from '../../copy-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'block-copy-expanded-example',
  templateUrl: './block-copy-expanded-example.component.html'
})
export class BlockCopyExpandedExampleComponent {
  actionsText: string = '';
  expandedEx01 = {
    copyBtnAriaLabel: 'Copy GraphQl Query',
    copyBtnLabel: 'Copy Query',
    copyValue: 'query HeroNameAndFriends($episode: Episode) {hero(episode: $episode) {name friends {name}}}',
    expandBtnAriaLabel: 'Toggle GraphQL Query',
    expanded: true,
    label: 'GraphQL Query'
  };

  constructor() {}

  handleCopyToClipboard($event: CopyEvent): void {
    this.actionsText = 'Copied: ' + $event.value + '\r\n' + this.actionsText;
  }
}
