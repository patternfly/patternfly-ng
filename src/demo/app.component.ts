import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  host: {'class': 'app app-component flex-container in-column-direction flex-grow-1'},
  selector: 'demo-app',
  styles: [],
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor() {}

  ngOnInit() {}
}
