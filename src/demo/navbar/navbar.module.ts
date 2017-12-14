import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppRoutingModule } from '../app-routing.module';
import { NavbarComponent } from './navbar.component';
import { NavbarSideComponent } from './navbar-side.component';
import { NavbarTopComponent } from './navbar-top.component';

@NgModule({
  imports: [
    AppRoutingModule,
    CollapseModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  declarations: [NavbarComponent, NavbarSideComponent, NavbarTopComponent],
  exports: [NavbarComponent, NavbarSideComponent, NavbarTopComponent]
})
export class NavbarModule {}
