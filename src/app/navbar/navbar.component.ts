import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {first, filter} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {User, Channel} from '../_models';
import {UserService} from '../_services';
import {DataService} from '../_services';
import {AlertService, AuthenticationService} from '../_services';
import {Location} from '@angular/common';
import {Router, ActivatedRoute, RoutesRecognized, NavigationEnd} from '@angular/router';
import {routerNgProbeToken} from '@angular/router/src/router_module';
import {logDeprecation} from 'sweetalert/typings/modules/options/deprecations';

enum NavType {
  Main,
  Channel,
  Settings,
  Statistic
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() navbarSettings = new EventEmitter();
  currentUser: User;
  NavType: typeof NavType = NavType;
  currentNavType: NavType;
  users: User[] = [];
  routeData;
  currentUrl: string;
  channel;
  channelS: Channel;
  routeParams: string;
  subscriptionChannel: Subscription;
  subscriptionAdmin: Subscription;
  subscriptionAdminArea: Subscription;
  adminArea: boolean;
  isAdmin: boolean;
  paths;
  loading;
  isShown = false;

  constructor(
    // private location: Location,
    private userService: UserService,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.userService.userEmitter.subscribe(user => {
      this.currentUser = user;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('currentUser', this.currentUser);
    this.subscriptionChannel = this.dataService.getChannel().subscribe(channelS => {
      //
      this.channelS = channelS;
      console.log('channelS', this.channelS);
    });
    this.subscriptionAdmin = this.dataService.getAdmin().subscribe(isAdmin => {
      //
      this.isAdmin = isAdmin;
      console.log('isAdmin', this.isAdmin);
    });
    this.subscriptionAdminArea = this.dataService.getAdminArea().subscribe(adminArea => {
      //
      this.adminArea = adminArea;
      console.log('adminArea', this.adminArea);
    });
  }
  toggleNavbar() {
    this.isShown = !this.isShown;
  }

  ngOnInit() {
    this.loading = true;
    console.log('loading1', this.loading);

    this.activatedRoute.params.subscribe(routeParams => {
      this.routeParams = routeParams.id;
      console.log('routeParams.id', this.routeParams);
    });
    this.NavTypeEvents();
  }

  private NavTypeEvents() {
    this.router.events
      .pipe(
        filter(e => {
          // console.log({e});
          return e instanceof NavigationEnd;
        })
      )
      .subscribe((navEnd: NavigationEnd) => {
        this.loading = true;
        console.log('loading4', this.loading);
        this.paths = navEnd.urlAfterRedirects.split('/');
        console.log({navEnd});
        if (this.paths[1] === 'main') {
          if (this.paths.length > 2) {
            // with channel
            this.currentNavType = NavType.Channel;

            this.getChannel(this.paths[2]);
            console.log('channel', this.paths[2]);
          } else {
            // just main
            this.currentNavType = NavType.Main;
            console.log('main');
          }
        } else if (this.paths[1] === 'statistic') {
          if (this.paths.length > 2) {
            this.currentNavType = NavType.Statistic;
            this.getChannel(this.paths[2]);

            console.log('settings', this.paths[2]);
          }
        } else if (this.paths[1] === 'settings') {
          if (this.paths.length > 2) {
            this.currentNavType = NavType.Settings;
            // this.getChannel(paths[2]);

            console.log('settings', this.paths[2]);
          }
        } else {
          this.currentNavType = NavType.Main;
        }
      });
  }

  navbarSettingsChange() {
    console.log('adminArea?', this.adminArea);
    if (!this.adminArea) {
      console.log('not adminArea andpath', this.adminArea, this.paths, 'path[3]', this.paths[3]);
      if (this.paths[3] && this.paths[3] === 'users') {
        console.log('not adminArea andpath@', this.adminArea, this.paths, 'path[2]', this.paths[2]);
        this.router.navigate(['/settings', this.paths[2]]);

      } else {
        this.router.navigate(['/main']);
      }
    } else {
      this.adminArea = false;
      console.log('adminArea', this.adminArea);
      this.dataService.sendAdminArea(this.adminArea);
    }
  }

  getChannel(channelId): void {
    // this.loading = true;
    console.log('loading2', this.loading);

    // this.channel = {name: ''};
    console.log('channel', this.channel);
    this.userService.getChannelByID(channelId).subscribe(channel => {
      this.channel = channel;
      this.loading = false;
      console.log('loading3', this.loading);

      console.log('channel!!!!', this.channel);

      // return this.channel;
    });
  }

  logout() {
    console.log('logout');
    this.userService.logout();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  register() {
    console.log('logout');
    this.userService.logout();
    this.currentUser = null;
    this.router.navigate(['/register']);
  }

  deleteUser(id: number) {
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.loadAllUsers();
      });
  }

  private loadAllUsers() {
    this.userService
      .getAll()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
    this.subscriptionChannel.unsubscribe();
  }
}
