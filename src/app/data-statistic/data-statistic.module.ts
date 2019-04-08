import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataStatisticComponent} from './data-statistic.component';
import {DataRoutingModule} from './data-routing.module';

@NgModule({
  declarations: [DataStatisticComponent],
  imports: [
    CommonModule,
    DataRoutingModule
  ]
})
export class DataStatisticModule { }
