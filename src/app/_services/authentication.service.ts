import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '../_models';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}
  token;
  private currentUser = new Subject<User>();

  public userEmitter = this.currentUser.asObservable();

  userEmitChange(usr: User) {
    this.currentUser.next(usr);
  }

  login(Email: string, Password: string) {
    this.token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `bearer ${this.token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    };
    console.log('8', header);
    return this.http
      .post(
        `${environment.apiUrlCall}signin`,
        {
          Email: Email,
          Password: Password
        },
        header
      )
      .pipe(
        tap(user => {
          console.log('6', user);
          // login successful if there's a jwt token in the response
          // if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));

          // this.userEmitChange(user);
          // }

          return user;
        })
      );
  }
  // register(user: User): Observable<User> {
  //   this.token = localStorage.getItem("token");

  //     const  header = {
  //               headers: {
  //                   Authorization: `bearer ${this.token}`,
  //                   "Content-Type": "application/json",
  //                   "Access-Control-Allow-Origin": "*"
  //                 }
  //              }

  //   return this.http.post<User>(`${environment.apiUrlCall}signup`, user, header).pipe(
  //      tap((user: User) => console.log("5",user)),
  //   catchError(this.handleError<User>('registrUser'))
  // );
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    localStorage.removeItem('token');
  }
  //
}
