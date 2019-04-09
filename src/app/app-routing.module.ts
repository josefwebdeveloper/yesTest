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
  {path: 'main/:id', component: ListMessageComponent},

  {path: 'invitation/:id', component: InvitationComponent},

  {path: 'contactus', component: ContactUsComponent},
  {
    path: 'statistic/:id', loadChildren: './data-statistic/data-statistic.module#DataStatisticModule'
  },
  {path: 'settings/:id', component: MainChannelComponent},

  {path: 'settings/:id/users', component: UsersComponent},

  {path: 'about', component: AboutComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'main', component: MainStartComponent},
  {path: 'test', component: TestComponent},
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
