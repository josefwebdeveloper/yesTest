import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './signup/signup.component';
import {SignUpGuard} from '../_guards';
import {LoginPhoneComponent} from './login-phone/login-phone.component';

const route: Routes = [
  {path: 'register', component: SignupComponent, canActivate: [SignUpGuard]},
  {path: 'login', component: LoginPhoneComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule {
}
