import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListMessageComponent} from './list-message/list-message.component';
import {AuthGuard, SignUpGuard} from './_guards';
import {ListTestComponent} from './list-test/list-test.component';
import {SignupComponent} from './signup/signup.component';
import {LoginComponent} from './login/login.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutComponent} from './about/about.component';
import {TermsComponent} from './terms/terms.component';
import {SignupPhoneComponent} from './signup-phone/signup-phone.component';
import {InvitationComponent} from './invitation/invitation.component';
import {LoginPhoneComponent} from './login-phone/login-phone.component';
import {MainStartComponent} from './main-start/main-start.component';
import {MainChannelComponent} from './main-channel/main-channel.component';
import {TestComponent} from './test/test.component';
import {DataStatisticComponent} from './data-statistic/data-statistic.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: 'main/:id', component: ListMessageComponent, canActivate: [AuthGuard]},

  // { path: 'login', component: LoginComponent },
  {path: 'register', component: SignupComponent, canActivate: [SignUpGuard]},
  {path: 'login', component: LoginPhoneComponent},
  {path: 'invitation/:id', component: InvitationComponent, canActivate: [AuthGuard]},

  {path: 'contactus', component: ContactUsComponent, canActivate: [AuthGuard]},
  {
    path: 'statistic/:id', component: DataStatisticComponent, canActivate: [AuthGuard]
  },
  {path: 'settings/:id', component: MainChannelComponent, canActivate: [AuthGuard]},

  {path: 'settings/:id/users', component: UsersComponent, canActivate: [AuthGuard]},

  {path: 'about', component: AboutComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'main', component: MainStartComponent, canActivate: [AuthGuard]},
  {path: 'test', component: TestComponent, canActivate: [AuthGuard]},
  {
    path: '**',
    redirectTo: '/main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
