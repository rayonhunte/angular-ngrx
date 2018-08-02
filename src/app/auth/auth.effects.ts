import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Login, AuthActionTypes, Logout} from '../auth/auth.actions';
import { tap } from '../../../node_modules/rxjs/operators';
import { Router } from '../../../node_modules/@angular/router';
import { defer, of } from 'rxjs';


@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
    login$ = this.actions$.pipe(
      ofType<Login>(AuthActionTypes.LoginAction),
      tap(action => localStorage.setItem('user', JSON.stringify(action.payload.user)))
    );

    @Effect({dispatch: false})
    logOut$ = this.actions$.pipe(
      ofType<Logout>(AuthActionTypes.LogoutAction),
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    );

    @Effect()
    init$ = defer(
      () => {
        const userData = localStorage.getItem('user');
        console.log(userData);
        if (userData) {
          return of(new Login({user: JSON.parse(userData)}));
        }else {
          of( new Logout());
        }
      }
    );
  constructor(private actions$: Actions, private router: Router) {}
}
