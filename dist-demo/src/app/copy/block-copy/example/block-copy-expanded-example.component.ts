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
    buttonAriaLabel: 'Copy GraphQl Query',
    buttonLabel: 'Copy Query',
    expandToggleAriaLabel: 'Toggle GraphQL Query',
    expanded: true,
    label: 'GraphQL Query',
    value: 'query HeroNameAndFriends($episode: Episode) {hero(episode: $episode) {name friends {name}}}'
  };

  constructor() {}

  handleCopy($event: CopyEvent): void {
    this.actionsText = 'Copied: ' + $event.value + '\r\n' + this.actionsText;
  }
}
