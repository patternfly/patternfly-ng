// import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

// App components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DemoComponentsModule } from './components/demo-components.module';
import { NavbarModule } from './navbar/navbar.module';

// Main areas
//  import example modules
import { AboutModalExampleModule } from '../app/modal/examples/about-modal-example.module';
import { ActionExampleModule } from '../app/action/examples/action-example.module';
import { CardExampleModule } from '../app/card/basic-card/examples/card-example.module';
import { DataTableExampleModule } from '../app/datatable/examples/datatable-example.module';
import { DonutExampleModule } from '../app/chart/donut/examples/donut-example.module';
import { EmptyStateExampleModule } from '../app/empty-state/examples/empty-state-example.module';
import { FilterExampleModule } from '../app/filter/examples/filter-example.module';
import { InfoStatusCardExampleModule } from '../app/card/info-status-card/examples/info-status-card-example.module';
import { ListExampleModule } from '../app/list/basic-list/examples/list-example.module';
import { NotificationExampleModule } from '../app/notification/examples/notification-example.module';
import { PaginationExampleModule } from '../app/pagination/examples/pagination-example.module';
import { RemainingCharsCountExampleModule }
  from '../app/remaining-chars-count/examples/remaining-chars-count-example.module';
import { SampleExampleModule } from '../app/sample/examples/sample-example.module';
import { SearchHighlightExampleModule } from '../app/pipe/search-highlight/examples/search-highlight-example.module';
import { SortArrayExampleModule } from '../app/pipe/sort-array/examples/sort-array-example.module';
import { SortExampleModule } from '../app/sort/examples/sort-example.module';
import { SparklineExampleModule } from '../app/chart/sparkline/examples/sparkline-example.module';
import { ToolbarExampleModule } from '../app/toolbar/examples/toolbar-example.module';
import { TreeListExampleModule } from '../app/list/tree-list/examples/tree-list-example.module';
import { TruncateExampleModule } from '../app/pipe/truncate/examples/truncate-example.module';
import { WelcomeComponent } from './components/welcome.component';
import { WizardExampleModule } from '../app/wizard/examples/wizard-example.module';
import { NavigationExampleModule } from '../app/navigation/examples/navigation-example.module';

@NgModule({
  imports: [
    AboutModalExampleModule,
    ActionExampleModule,
    AppRoutingModule,
    BrowserModule,
    CardExampleModule,
    DataTableExampleModule,
    DemoComponentsModule,
    DonutExampleModule,
    EmptyStateExampleModule,
    FilterExampleModule,
    FormsModule,
    HttpModule,
    InfoStatusCardExampleModule,
    ListExampleModule,
    NavbarModule,
    NotificationExampleModule,
    PaginationExampleModule,
    RemainingCharsCountExampleModule,
    SampleExampleModule,
    SearchHighlightExampleModule,
    SortArrayExampleModule,
    SortExampleModule,
    SparklineExampleModule,
    ToolbarExampleModule,
    TreeListExampleModule,
    TruncateExampleModule,
    NavigationExampleModule,
    WizardExampleModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
