// import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// App components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Main areas
//  import example modules
import { ActionExampleModule } from '../app/action/examples/action-example.module';
import { CardExampleModule } from '../app/card/basic-card/examples/card-example.module';
import { SparklineExampleModule } from '../app/chart/sparkline/examples/sparkline-example.module';
import { EmptyStateExampleModule } from '../app/empty-state/examples/empty-state-example.module';
import { FilterExampleModule } from '../app/filter/examples/filter-example.module';
import { ListExampleModule } from '../app/list/basic-list/examples/list-example.module';
import { TreeListExampleModule } from '../app/list/tree-list/examples/tree-list-example.module';
import { NavigationExampleModule } from '../app/navigation/examples/navigation-example.module';
import { NotificationExampleModule } from '../app/notification/examples/notification-example.module';
// tslint:disable-next-line
import { RemainingCharsCountExampleModule } from '../app/remaining-chars-count/examples/remaining-chars-count-example.module';
import { SampleExampleModule } from '../app/sample/examples/sample-example.module';
import { SearchHighlightExampleModule } from '../app/search-highlight/examples/search-highlight-example.module';
import { SortExampleModule } from '../app/sort/examples/sort-example.module';
import { ToolbarExampleModule } from '../app/toolbar/examples/toolbar-example.module';
import { WizardExampleModule } from '../app/wizard/examples/wizard-example.module';
import { WelcomeComponent } from './components/welcome.component';

@NgModule({
  imports: [
    ActionExampleModule,
    AppRoutingModule,
    BrowserModule,
    CardExampleModule,
    EmptyStateExampleModule,
    FilterExampleModule,
    FormsModule,
    HttpModule,
    ListExampleModule,
    NotificationExampleModule,
    RemainingCharsCountExampleModule,
    SampleExampleModule,
    SearchHighlightExampleModule,
    SortExampleModule,
    SparklineExampleModule,
    ToolbarExampleModule,
    TreeListExampleModule,
    NavigationExampleModule,
    WizardExampleModule
  ],
  declarations: [AppComponent, WelcomeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
