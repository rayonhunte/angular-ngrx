import { Injectable } from '../../../node_modules/@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs';
import { Store, select } from '../../../node_modules/@ngrx/store';
import { AppState } from '../reducers';
import { isLoggedIn } from './auth.selectors';
import { tap } from '../../../node_modules/rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router) {}
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedIn),
            tap( loggedIn => {
                if (!loggedIn) {
                    this.router.navigate(['login']);
                }
            })
        );
    }
}
