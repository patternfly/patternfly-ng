import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CopyEvent} from '../../copy-event';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'inline-copy-wrap-example',
  templateUrl: './inline-copy-wrap-example.component.html'
})
export class InlineCopyWrapExampleComponent implements OnInit {
  actionsText: string = '';
  wrapExConfig = {
    buttonAriaLabel: 'Copy JSON+LD Schema Example',
    // tslint:disable-next-line:max-line-length
    value: '{"@context": "http://json-ld.org/contexts/person.jsonld", "@id": "http://dbpedia.org/resource/John_Lennon", "name": "John Lennon", "born": "1940-10-09", "spouse": "http://dbpedia.org/resource/Cynthia_Lennon"}'
  };

  constructor() {}

  ngOnInit() {}

  handleCopy($event: CopyEvent): void {
    this.actionsText = 'Copied: ' + $event.value + '\r\n' + this.actionsText;
  }
}
