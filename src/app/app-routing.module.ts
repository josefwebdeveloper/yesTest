import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListMessageComponent} from './list-message/list-message.component';
import {AuthGuard, SignUpGuard} from './_guards';
import {ListTestComponent} from './list-test/list-test.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {AboutComponent} from './about/about.component';
import {TermsComponent} from './terms/terms.component';
import {InvitationComponent} from './invitation/invitation.component';
import {LoginPhoneComponent} from './auth/login-phone/login-phone.component';
import {MainStartComponent} from './main-start/main-start.component';
import {MainChannelComponent} from './main-channel/main-channel.component';
import {TestComponent} from './test/test.component';
import {DataStatisticComponent} from './data-statistic/data-statistic.component';
import {UsersComponent} from './users/users.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/main'},
  {path: 'main/:id', component: ListMessageComponent, canActivate: [AuthGuard]},

  {path: 'invitation/:id', component: InvitationComponent, canActivate: [AuthGuard]},

  {path: 'contactus', component: ContactUsComponent, canActivate: [AuthGuard]},
  {
    path: 'statistic/:id', loadChildren: './data-statistic/data-statistic.module#DataStatisticModule', canActivate: [AuthGuard]
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
