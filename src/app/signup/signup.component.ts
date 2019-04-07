import {Router} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {AlertService, UserService, DataService} from '../_services';
import {Subscription} from 'rxjs';

// import { LoadingService } from './../../servies/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  subscriptionFormdata: Subscription;
  loading = false;
  submitted = false;
  Password = 'password';
  token;
  returnUrlId: string;
  subscriptionReturnUrl: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private dataService: DataService
  ) {
    this.subscriptionReturnUrl = this.dataService.getUrl().subscribe(returnUrl => {
      //
      this.returnUrlId = returnUrl;
      console.log('returnUrl from login', this.returnUrlId);
    });
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      isReadTerms: ['', [Validators.required]],
      isMarketingSubscribe: ['', []]
    });
    this.subscriptionFormdata = this.dataService.getForm().subscribe(data => {

      if (data) {
        this.registerForm.patchValue({
          Email: data.Email,
          FirstName: data.FirstName,
          LastName: data.LastName
        });

      }
      // this.registerForm = data;
      console.log('registerForm', this.registerForm);
    });
  }

  ngOnInit() {
    this.token = this.userService.getToken();

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  goTerms() {
    console.log('toTerms');
    //
    this.dataService.sendForm({
      'FirstName': this.registerForm.controls.FirstName.value,
      'Email': this.registerForm.controls.Email.value,
      'LastName': this.registerForm.controls.LastName.value
    });
    this.router.navigate(['/terms']);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm);

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('registerForm', this.registerForm);
      console.log('registerForm222', this.registerForm.get('FirstName').value);
      // console.log('registerForm222', this.registerForm.set('FirstName').value);
      // this.registerForm.patchValue({
      //   FirstName: 'joseph'
      // });
      console.log('registerForm23', this.registerForm.controls.FirstName.value);
      return;
    }

    this.loading = true;
    this.userService
      .putUser(
        this.registerForm.get('FirstName').value,
        this.registerForm.get('LastName').value,
        this.registerForm.get('Email').value,
        this.registerForm.get('isReadTerms').value,
        this.registerForm.get('isMarketingSubscribe').value
      )
      .pipe(first())
      .subscribe(
        user => {
          if (user === undefined) {
            this.alertService.error('אירעה שגיאה', true);
            this.loading = false;
            return;
          }
          console.log('user from signuo', user);

          //  this.alertService.success('ההרשמה בוצעה בהצלחה', true);
          localStorage.setItem('currentUser', JSON.stringify(user));
          // localStorage.setItem('userToken', JSON.parse(JSON.stringify(user)).token);
          if (this.returnUrlId) {
            console.log('goto invitation',this.returnUrlId);
            this.router.navigate(['/invitation', this.returnUrlId]);
          } else {
            this.router.navigate(['/main']);
          }
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
