import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Staticdata} from '../staticContainer';
import {ImageUrl} from '../staticContainer';
// import { Staticdata } from './../staticContainer';
import {UserService} from './../_services/user.service';
import {AlertService} from './../_services/alert.service';
import {DataService} from './../_services/data.service';
import {switchMap, map} from 'rxjs/operators';
import {Router, ActivatedRoute, RoutesRecognized, NavigationEnd} from '@angular/router';
import {Channel} from '../_models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import swal from 'sweetalert';
import {ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main-channel',
  templateUrl: './main-channel.component.html',
  styleUrls: ['./main-channel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainChannelComponent implements OnInit, OnDestroy {
  @Input()
  adminArea = false;
  showButtonAdd = false;

  adminAreaIschanged;
  subscriptionAdminArea: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscriptionAdminArea = this.dataService.getAdminArea().subscribe(adminArea => {
      this.adminArea = adminArea;
      console.log('@@2', this.subscriptionAdminArea);
      console.log('adminArea', this.adminArea);
    });
  }

  test: boolean;
  channelId: string;
  channel: Channel;
  isAdmin = false;
  addUserForm: FormGroup;
  submitted = false;
  formArea = false;

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      Phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.activatedRoute.params.subscribe(routeParams => {
      // this.catName=routeParams;
      console.log('routeParams.id', routeParams.id);
      this.channelId = routeParams.id;
      if (routeParams.id) {
        this.getChannel(this.channelId);
      }
    });
  }

  get f() {
    return this.addUserForm.controls;
  }

  adminAreaTrigger() {
    this.adminArea = !this.adminArea;
    console.log('this.adminArea', this.adminArea);

    this.dataService.sendAdminArea(this.adminArea);
  }

  getChannel(channelId): void {
    this.userService.getChannelIdByIdPaging(channelId, 10, 1).subscribe(channel => {
      const currUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log('currUser', currUser.id);
      const channelAdminId = channel.admin;
      channel.admin === currUser.id ? (this.isAdmin = true) : (this.isAdmin = false);
      this.sendChannel(channel);
      console.log('channel from settings', this.channel);
      console.log('this.isAdmin', this.isAdmin);
      if (channel.userslist) {
        channel.userslist.value.data.map(el => {
          channelAdminId === el.userId ? (el.admin = true) : (el.admin = false);
          return el;
        });
        this.dataService.sendAdmin(this.isAdmin);
      }
      this.channel = channel;
      // this.dataService.sendSpinner(false);

      console.log('channel', this.channel);

      // return this.channel;
    });
  }

  deleteChannel(channelId): void {
    swal('Are you sure you want to delete channel?', {
      buttons: ['Oh noez', true]
    }).then(willDelete => {
      if (willDelete) {
        this.userService.deleteChannel(channelId).subscribe(response => {
          swal('Your channel was deleted', {
            icon: 'success'
          });
          this.router.navigate(['/main']);

          console.log('response', response);
          // return this.channel;
        });
      } else {
        // swal('Your canceled ');
      }
    });
  }

  sendChannel(channel): void {
    console.log('channel ', channel);
    this.dataService.sendChannel(channel);
  }

  onPhoneInput(value) {
    (value.length === 10) ? this.showButtonAdd = true : this.showButtonAdd = false;
  }


  onSubmit() {
    this.submitted = true;
    console.log('submit', this.addUserForm);

    // stop here if form is invalid
    if (this.addUserForm.invalid) {
      return;
    }

    // this.loading = true;
    console.log(this.f.Phone.value);
    // this.currentPhone = this.loginForm.value.Phone;
    this.userService
      .channelInvitationByPhone(this.addUserForm.value.Phone, this.channelId)
      .pipe(first())
      .subscribe(
        data => {
          if (data === undefined) {
            this.alertService.error('', true);
            // this.loading = false;
            console.log('responce undefined', data);
          }

          console.log('responce', data);
          swal(data.message);
          this.adminArea = false;
          return;
        },
        error => {
          console.log(error);

          this.alertService.error(error);
          // this.loading = false;
        }
      );
  }

  // questions;

  // answers;
  // answer;
  // pageCAll = 0;
  // page = 1;
  // mymessages;
  // channels;

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionAdminArea.unsubscribe();
    console.log('subscription destroyed');
  }
}
