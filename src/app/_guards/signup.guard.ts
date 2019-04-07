import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AlertService, DataService, UserService} from '../_services';
import {User} from '../_models';

@Injectable()
export class SignUpGuard implements CanActivate {
  returnURL: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private userService: UserService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.returnURL = window.location.href;
    if (this.returnURL.split('/')[3] === 'invitation') {
      this.dataService.sendUrl(this.returnURL.split('/')[4]);
      console.log('returnURL send', this.returnURL.split('/')[4]);
      // this.router.navigate(['/invitation', this.returnURL.split('/')[4]]);
    }
    const currUser = localStorage.getItem('currentUser');

    if (currUser && currUser !== undefined) {
      const user: User = JSON.parse(currUser);
      if (!user.isRegistrationFinish) {
        return true;
      }
    }

    this.router.navigate(['/main']);
    return false;
  }
}
