import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService, UserService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  token;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.token = localStorage.getItem('token');

    if (!this.token) {
      this.token = this.userService.getToken();
    }
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });

    // reset login status
    this.userService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    console.log('10this.returnUrl', this.returnUrl);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    console.log(this.f.Email.value, this.f.Password.value);
    // this.authenticationService.login(this.f.Email.value, this.f.Password.value)
    this.userService
      .login(this.f.Email.value, this.f.Password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('9', data);
          if (data === undefined) {
            this.alertService.error('שם המשתמש לא מוגדר במערכת');
            this.loading = false;
            return;
          }
          localStorage.setItem('currentUser', JSON.stringify(data));
          localStorage.setItem('userToken', JSON.parse(JSON.stringify(data)).token);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('9', error);
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
