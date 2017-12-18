import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'navbar-top',
  styleUrls: ['./navbar-top.component.less'],
  templateUrl: './navbar-top.component.html'
})
export class NavbarTopComponent implements OnInit {
  @Input() navItem: string;

  @Output('onNavItemSelect') onNavItemSelect = new EventEmitter();
  @Output('onNavbarToggle') onNavbarToggle = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  isNavItemSelected(name: string): boolean {
    return this.navItem === name;
  }

  selectNavItem($event: MouseEvent, name: string): void {
    this.navItem = name;
    this.onNavItemSelect.emit(name);
  }

  toggleNavbar($event: MouseEvent): void {
    this.onNavbarToggle.emit();
  }
}
