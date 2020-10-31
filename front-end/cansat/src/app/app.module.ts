import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { D3BarchartComponent } from './d3-barchart/d3-barchart.component';
import { ChartRealTimeComponent } from './chart-real-time/chart-real-time.component';

@NgModule({
  declarations: [
    AppComponent,
    D3BarchartComponent,
    ChartRealTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
