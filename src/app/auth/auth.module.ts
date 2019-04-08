import { NgModule } from '@angular/core';
import {LoginPhoneComponent} from './login-phone/login-phone.component';
import {SignupComponent} from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [LoginPhoneComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
