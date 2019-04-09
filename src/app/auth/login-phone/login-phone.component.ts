import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {first} from 'rxjs/operators';

import {AlertService, AuthenticationService, DataService, UserService} from '../../_services';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/reducers';
import {LogInSuccess} from '../../store/auth.actions';

class Subsciption {
}

@Component({
  selector: 'app-login-phone',
  templateUrl: './login-phone.component.html',
  styleUrls: ['./login-phone.component.scss']
})
export class LoginPhoneComponent implements OnInit {
  loginForm: FormGroup;
  submitForm: FormGroup;
  waitingForCode = false;
  loading = false;
  submitted = false;
  returnUrlId: string;
  error = '';
  token;
  currentPhone;
  subscriptionReturnUrl: Subsciption;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private dataService: DataService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private store: Store<AppState>
  ) {


    this.subscriptionReturnUrl = this.dataService.getUrl().subscribe(returnUrl => {
      //
      this.returnUrlId = returnUrl;
      console.log('returnUrl from login', this.returnUrlId);
    });
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');

    if (!this.token) {
      this.token = this.userService.getToken();
    }
    this.loginForm = this.formBuilder.group({
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
    });
    this.submitForm = this.formBuilder.group({
      Code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
    // reset login status ! dont forget
    // this.userService.logout();

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    // console.log('10this.returnUrl', this.returnUrl);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get c() {
    return this.submitForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.f.Phone.value);
    this.currentPhone = this.loginForm.value.Phone;
    this.userService
      .registerPhone({Phone: this.loginForm.value.Phone, Region: 'IL'})
      .pipe(first())
      .subscribe(
        data => {
          if (data === undefined) {
            // this.alertService.error('כתובת הדוא"ל כבר קיימת במערכת', true);
            this.loading = false;
            return;
          }

          this.loading = false;
          this.waitingForCode = true;

          //  this.alertService.success('ההרשמה בוצעה בהצלחה', true);

          //  localStorage.setItem("currentUser", JSON.stringify(data));
          //  localStorage.setItem("userToken", JSON.parse(JSON.stringify(data)).token);

          //  this.router.navigate(['/home']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }

  onSubmitCode() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.submitForm.invalid) {
      console.log('registerForm confirm', this.submitForm);
      return;
    }

    this.loading = true;
    this.userService
      .verifyPhone({
        Phone: this.currentPhone,
        Code: this.submitForm.value.Code,
        Region: 'IL'
      })
      .pipe(first())
      .subscribe(
        user => {
          if (user === undefined) {
            this.alertService.error('אירעה שגיאה', true);
            this.loading = false;
            return;
          }

          // this.alertService.success("ההרשמה בוצעה בהצלחה", true);

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('userToken', JSON.parse(JSON.stringify(user)).token);
          this.store.dispatch(new LogInSuccess(user));
          if (!user.isRegistrationFinish) {
            this.router.navigate(['/register']);
          } else {
            if (this.returnUrlId) {
              console.log('goto invitation', this.returnUrlId);

              this.router.navigate(['/invitation', this.returnUrlId]);
            } else {
              this.router.navigate(['/main']);

            }

          }

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
