import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertService, UserService } from '../_services';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  modalRef: BsModalRef;
  contact: FormGroup;
  loading = false;
  submitted = false;
  Password = 'password';
  token;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    this.token = this.userService.getToken();
    this.contact = this.formBuilder.group({
      Name: ['', Validators.required],
      Message: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', [Validators.required, Validators.minLength(9)]]
    });
    console.log(this.contact, ' this.contact');
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.contact.controls;
  }
  onSubmit() {
    console.log(this.contact, ' this.contact');
    this.submitted = true;
    if (this.contact.invalid) {
      console.log('registerForm!!! invalid', this.contact);
      return;
    }
    this.loading = true;
    this.userService
      .email(this.contact.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('succes send', data);
          // formGroup="myForm";
          if (data === undefined) {
            //  this.alertService.error('כתובת הדוא"ל כבר קיימת במערכת', true);
            this.loading = false;
            return;
          }
          this.loading = false;

          this.alertService.success('תודה, קיבלנו את הפניה שלך וניצור איתך קשר בהקדם.', true);
          this.router.navigate(['/contactus']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
  }
}
