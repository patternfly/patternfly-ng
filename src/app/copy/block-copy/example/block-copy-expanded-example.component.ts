import {
  Component,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'block-copy-expanded-example',
  templateUrl: './block-copy-expanded-example.component.html'
})
export class BlockCopyExpandedExampleComponent {

  expandedEx01 = {
    label: 'GraphQL Query',
    buttonLabel: 'Copy Query',
    copyValue: 'query HeroNameAndFriends($episode: Episode) {hero(episode: $episode) {name friends {name}}}',
    expanded: true
  };

  constructor() {}
}
