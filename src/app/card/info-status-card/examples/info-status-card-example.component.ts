import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { InfoStatusCardConfig } from '../info-status-card-config';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'info-status-card-example',
  templateUrl: './info-status-card-example.component.html'
})

export class InfoStatusCardExampleComponent implements OnInit {

  card1Config: InfoStatusCardConfig = {
    showTopBorder: true,
    htmlContent: true,
    title: 'TinyCore-local',
    href: '//www.redhat.com/',
    iconStyleClass: 'fa fa-shield',
    info: [
      'VM Name: aapdemo002',
      'Host Name: localhost.localdomian',
      'IP Address: 10.9.62.100',
      'Power status: on'
    ]
  };

  card2Config: InfoStatusCardConfig = {
    showTopBorder: false,
    htmlContent: false,
    iconImageSrc: '//www.patternfly.org/assets/img/redhat.svg',
    info: [
      'Infastructure: VMware',
      'Vmware: 1 CPU (1 socket x 1 core), 1024 MB',
      '12 Snapshots',
      'Drift History: 1',
      '<strong>No htmlContent</strong>'
    ]

  };

  card3Config: InfoStatusCardConfig = {
    htmlContent: true,
    title: 'Favorite Things',
    iconStyleClass: 'fa fa-heart',
    info: [
      '<i class="fa fa-coffee">',
      '<i class="fa fa-motorcycle">',
      '<b>Tacos</b>'
    ]
  };

  /**
   * The default constructor
   */
  constructor() {}

  /**
   *  Setup any component configuration upon initialization
   */
  ngOnInit(): void {}
}
