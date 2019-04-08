import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {DataStatisticComponent} from './data-statistic.component';
import {AuthGuard} from '../_guards';

const route: Routes = [
  {
    path: '', component: DataStatisticComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports: [
    RouterModule
  ]
})
export class DataRoutingModule {
}
