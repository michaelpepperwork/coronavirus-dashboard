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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgReduxModule,
    LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG }),
    NgMaterialModule,
    BrowserAnimationsModule,

  ],
  providers: [],
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

