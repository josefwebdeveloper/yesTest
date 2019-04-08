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
import { NavbarComponent } from './navbar/navbar.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { TermsComponent } from './terms/terms.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { YesAlertDirective } from './_directives/yes-alert.directive';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MainStartComponent } from './main-start/main-start.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InvitationComponent } from './invitation/invitation.component';
import { MainChannelComponent } from './main-channel/main-channel.component';
import { MatIconModule } from '@angular/material/icon';
import { TestComponent } from './test/test.component';
import { UsersComponent } from './users/users.component';
import { UserAskComponent } from './list-message/user-ask/user-ask.component';
import {MatTooltipModule} from '@angular/material';
import {AuthModule} from './auth/auth.module';
import {DataStatisticModule} from './data-statistic/data-statistic.module';

@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    ListMessageComponent,
    ListTestComponent,
    NavbarComponent,
    ContactUsComponent,
    AboutComponent,
    TermsComponent,
    YesAlertDirective,
    MainStartComponent,
    InvitationComponent,
    MainChannelComponent,
    TestComponent,
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
    MatTooltipModule,
    AuthModule
  ],
  exports: [],
  providers: [
    AuthGuard,
    SignUpGuard,
    UserService,
    AlertService,
    AuthenticationService,
    ApiService,
    DataService,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
