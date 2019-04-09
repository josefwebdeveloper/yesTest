import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../_services';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthActionTypes, LogIn, LogInFailure, LogInSuccess} from './auth.actions';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class AppEffects {
  constructor(
    private actions: Actions,
    private api: UserService,
    private router: Router
  ) {
  }
//
//   @Effect()
//   LogIn: Observable<any> = this.actions.pipe(
//     ofType(AuthActionTypes.LOGIN),
//     mergeMap(payload=>{
//       return this.api.registerPhone(payload).pipe(
//         map()
//       )
//     })

    // mergeMap((payload) => this.api.login(payload))
    // .map((action: LogIn) => action.payload)
    // .switchMap(payload => {
    //   return this.api.logIn(payload.email, payload.password)
    //     .map((user) => {
    //       return new LogInSuccess({token: user.token, email: payload.email});
    //     })
    //     .catch((error) => {
    //       return Observable.of(new LogInFailure({ error: error }));
    //     });
    // }));

//   loadMovies$ = this.actions
//     .pipe(
//       ofType('[Movies Page] Load Movies'),
//       mergeMap(() => this.moviesService.getAll()
//         .pipe(
//           map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
//           catchError(() => EMPTY)
//         ))
//     );
// );
}
