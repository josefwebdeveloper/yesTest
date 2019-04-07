import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService, UserService } from '../_services';

@Component({
  selector: 'app-signup-phone',
  templateUrl: './signup-phone.component.html',
  styleUrls: ['./signup-phone.component.scss']
})
export class SignupPhoneComponent implements OnInit {
  registerForm: FormGroup;
  submitForm: FormGroup;
  loading = false;
  submitted = false;
  Password = 'password';
  token;
  currentPhone;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.token = this.userService.getToken();
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
    });
    this.submitForm = this.formBuilder.group({
      Code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  //   checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  //   let pass = group.controls.Password.value;
  //   let confirmPass = group.controls.ConfirmPassword.value;
  //   let compare=pass === confirmPass ? null : { notSame: true }
  //   return compare;
  // }
  get f() {
    return this.registerForm.controls;
  }
  get c() {
    return this.submitForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('registerForm phone', this.registerForm.value.Phone);
      return;
    }
    this.currentPhone = this.registerForm.value.Phone;
    this.loading = true;
    this.userService
      .registerPhone({ Phone: this.registerForm.value.Phone, Region: 'IL' })
      .pipe(first())
      .subscribe(
        data => {
          if (data === undefined) {
            // this.alertService.error('כתובת הדוא"ל כבר קיימת במערכת', true);
            this.loading = false;
            return;
          }
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
      .verifyPhone({ Phone: this.currentPhone, Code: this.submitForm.value.Code, Region: 'IL' })
      .pipe(first())
      .subscribe(
        data => {
          if (data === undefined) {
            this.alertService.error('כתובת הדוא"ל כבר קיימת במערכת', true);
            this.loading = false;
            return;
          }
          this.alertService.success('ההרשמה בוצעה בהצלחה', true);

          //  localStorage.setItem("currentUser", JSON.stringify(data));
          //  localStorage.setItem("userToken", JSON.parse(JSON.stringify(data)).token);

          this.router.navigate(['/main']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
