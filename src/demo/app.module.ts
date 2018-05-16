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
import { AboutModalExampleModule } from '../app/modal/example/about-modal-example.module';
import { ActionExampleModule } from '../app/action/example/action-example.module';
import { ApplicationLauncherExampleModule }
  from '../app/navigation/application-launcher/example/application-launcher-example.module';
import { CardExampleModule } from '../app/card/basic-card/example/card-example.module';
import { DonutChartExampleModule } from '../app/chart/donut-chart/basic-donut-chart/example/donut-chart-example.module';
import { EmptyStateExampleModule } from '../app/empty-state/example/empty-state-example.module';
import { FilterExampleModule } from '../app/filter/example/filter-example.module';
import { InfoStatusCardExampleModule } from '../app/card/info-status-card/example/info-status-card-example.module';
import { InlineNotificationExampleModule }
  from '../app/notification/inline-notification/example/inline-notification-example.module';
import { ListExampleModule } from '../app/list/basic-list/example/list-example.module';
import { NotificationDrawerExampleModule } 
from '../app/notification/notification-drawer/example/notification-drawer-example.module';
import { NotificationServiceExampleModule }
  from '../app/notification/notification-service/example/notification-service-example.module';
import { PaginationExampleModule } from '../app/pagination/example/pagination-example.module';
import { RemainingCharsCountExampleModule }
  from '../app/remaining-chars-count/example/remaining-chars-count-example.module';
import { SampleExampleModule } from '../app/sample/example/sample-example.module';
import { SearchHighlightExampleModule } from '../app/pipe/search-highlight/example/search-highlight-example.module';
import { SortArrayExampleModule } from '../app/pipe/sort-array/example/sort-array-example.module';
import { SortExampleModule } from '../app/sort/example/sort-example.module';
import { SparklineChartExampleModule } from '../app/chart/sparkline-chart/example/sparkline-chart-example.module';
import { TableExampleModule } from '../app/table/basic-table/example/table-example.module';
import { ToastNotificationExampleModule }
  from '../app/notification/toast-notification/example/toast-notification-example.module';
import { ToastNotificationListExampleModule }
  from '../app/notification/toast-notification-list/example/toast-notification-list-example.module';
import { ToolbarExampleModule } from '../app/toolbar/example/toolbar-example.module';
import { TreeListExampleModule } from '../app/list/tree-list/example/tree-list-example.module';
import { TruncateExampleModule } from '../app/pipe/truncate/example/truncate-example.module';
import { VerticalNavigationExampleModule }
  from '../app/navigation/vertical-navigation/example/vertical-navigation-example.module';
import { UtilizationDonutChartExampleModule }
  from '../app/chart/donut-chart/utilization-donut-chart/example/utilization-donut-chart-example.module';
import { WelcomeComponent } from './components/welcome.component';
import { WizardExampleModule } from '../app/wizard/example/wizard-example.module';

@NgModule({
  imports: [
    AboutModalExampleModule,
    ActionExampleModule,
    AppRoutingModule,
    ApplicationLauncherExampleModule,
    BrowserModule,
    CardExampleModule,
    DemoComponentsModule,
    DonutChartExampleModule,
    EmptyStateExampleModule,
    FilterExampleModule,
    FormsModule,
    HttpModule,
    InfoStatusCardExampleModule,
    InlineNotificationExampleModule,
    ListExampleModule,
    NotificationDrawerExampleModule,
    NavbarModule,
    NotificationServiceExampleModule,
    PaginationExampleModule,
    RemainingCharsCountExampleModule,
    SampleExampleModule,
    SearchHighlightExampleModule,
    SortArrayExampleModule,
    SortExampleModule,
    SparklineChartExampleModule,
    TableExampleModule,
    ToastNotificationExampleModule,
    ToastNotificationListExampleModule,
    ToolbarExampleModule,
    TreeListExampleModule,
    TruncateExampleModule,
    UtilizationDonutChartExampleModule,
    VerticalNavigationExampleModule,
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
