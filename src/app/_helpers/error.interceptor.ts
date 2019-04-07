import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
// import { environment } from '../../environments/environment';
import {UserService} from '../_services';
import {Router} from '@angular/router';
import swal from 'sweetalert';

// import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 400) {
          console.log('err', err);
          // auto logout if 401 response returned from api
          // localStorage.removeItem("token");
          // this.userService.logout();
          // this.router.navigate(['/login']);
          swal('Invitation not available');
          this.router.navigate(['/main']);

          // location.reload(true);
        }
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          // localStorage.removeItem("token");
          this.userService.logout();
          this.router.navigate(['/login']);

          // location.reload(true);
        }
        if (err.status === 403) {
          swal('Your Are Not Authorised On That Channel!');

          // this.userService.logout();
          this.router.navigate(['/main']);
          // location.reload(true);
        }
        if (err.status === 404) {
          // console.log('404');
          // auto logout if 401 response returned from api

          // this.userService.logout();
          // this.router.navigate(['/login']);
          // location.reload(true);
        }

        if (err.status === 400) {
          this.router.navigate(['/main']);

          // auto logout if 401 response returned from api
          // this.userService.logout();
          // location.reload(true);
        }

        const error = err.error.message || err.statusText;
        console.log('errorsinterseptor', error);
        return throwError(error);
      })
    );
  }
}
