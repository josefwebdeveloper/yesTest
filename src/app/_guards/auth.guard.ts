import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AlertService, UserService, DataService} from '../_services';
import {User} from '../_models';
import {Location} from '@angular/common';
// import {DataService}from DataService
import {from} from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  href: string;
  returnURL: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // this.returnURL = this.router.url;
    this.returnURL = window.location.href;
    if (this.returnURL.split('/')[3] === 'invitation') {
      this.dataService.sendUrl(this.returnURL.split('/')[4]);
      console.log('returnURL send',  this.returnURL.split('/')[4]);
      // this.router.navigate(['/invitation', this.returnURL.split('/')[4]]);
    }


    // this.href = this.router.url;
    // console.log('Url', this.href);

    const currUser = localStorage.getItem('currentUser');
    console.log('currUser', currUser);

    if (currUser && currUser !== undefined) {
      const user: User = JSON.parse(currUser);
      if (user) {
        if (user.isRegistrationFinish) {
          console.log('AuthGuard true');
          ('AuthGuard true');
          return true;
        } else {
          this.router.navigate(['/register']);
          return false;
        }
      }
    }

    // not logged in so redirect to login page with the return url
    this.userService.getToken();
    this.router.navigate(['/login']);

    return false;
  }
}
