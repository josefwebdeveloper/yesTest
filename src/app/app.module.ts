import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// import { fakeBackendProvider } from './_helpers';
import { AlertComponent } from './_directives';
import { AlertService, AuthenticationService, UserService } from './_services';
import { ApiService } from './_services/api.service';
import { DataService } from './_services/data.service';
import { ErrorInterceptor } from './_helpers';
import { AuthGuard, SignUpGuard } from './_guards';
import { ListMessageComponent } from './list-message/list-message.component';
import { ListTestComponent } from './list-test/list-test.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { YesAlertDirective } from './_directives/yes-alert.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { SweetAlertService } from 'angular-sweetalert-service';

import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MainStartComponent } from './main-start/main-start.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SignupPhoneComponent } from './signup-phone/signup-phone.component';
import { InvitationComponent } from './invitation/invitation.component';
import { LoginPhoneComponent } from './login-phone/login-phone.component';
import { MainChannelComponent } from './main-channel/main-channel.component';
import { MatIconModule } from '@angular/material/icon';
import { TestComponent } from './test/test.component';
import { DataStatisticComponent } from './data-statistic/data-statistic.component';
import { UsersComponent } from './users/users.component';
import { UserAskComponent } from './list-message/user-ask/user-ask.component';
import {MatTooltipModule} from '@angular/material';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    ListMessageComponent,
    ListTestComponent,
    SignupComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ContactUsComponent,
    AboutComponent,
    TermsComponent,
    YesAlertDirective,
    MainStartComponent,
    SignupPhoneComponent,
    InvitationComponent,
    LoginPhoneComponent,
    MainChannelComponent,
    TestComponent,
    DataStatisticComponent,
    UsersComponent,
    UserAskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MatCardModule,
    MatBadgeModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  exports: [],
  providers: [
    AuthGuard,
    SignUpGuard,
    UserService,
    AlertService,
    AuthenticationService,
    ApiService,
    // SweetAlertService,
    DataService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
