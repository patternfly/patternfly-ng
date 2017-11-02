import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  host: { 'class': '' },
  selector: 'demo-app',
  styleUrls: ['./app.component.less'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor() {}

  ngOnInit() {}
}
