import { HomeComponent } from './pages/home/home.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IAppState, INITIAL_STATE, rootReducer } from './redux/store';
import { NgMaterialModule } from './modules/ng-material/ng-material.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { CountrySummaryCardComponent } from './ui-components/country-summary-card/country-summary-card.component';
import { LoadingMaskComponent } from './ui-components/loading-mask/loading-mask.component';
import { CountriesTableCardComponent } from './ui-components/countries-table-card/countries-table-card.component';
import { CountrySummaryDialogComponent } from './ui-components/country-summary-dialog/country-summary-dialog.component';
import { HighlightCardComponent } from './ui-components/highlight-card/highlight-card.component';
import { GenericErrorComponent } from './pages/errors/generic-error/generic-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GenericErrorComponent,

    CountrySummaryCardComponent,
    LoadingMaskComponent,
    CountriesTableCardComponent,
    CountrySummaryDialogComponent,
    HighlightCardComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgReduxModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),
    BrowserAnimationsModule,
    NgMaterialModule,
  ],
  providers: [
    { provide: 'BACKEND_API_URL', useValue: environment.apiPath },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {


  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {

    const enhancers = isDevMode() ? [devTools.enhancer()] : [];

    ngRedux.configureStore(rootReducer,
      INITIAL_STATE,
      [],
      enhancers
    );
  }
}

