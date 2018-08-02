import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngrx/store';
import * as fromAppState from '../../reducers';
import * as fromAuthActions from '../../auth/auth.actions';

import {AuthService} from '../auth.service';
import {tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private auth: AuthService,
      private router: Router, private store: Store<fromAppState.State>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val = this.form.value;
    // this.store.dispatch(new fromAuthActions.Login());
    this.auth.login(val.email, val.password)
    .pipe(
      tap( user => {
        this.store.dispatch(new fromAuthActions.Login({user}));
        this.router.navigateByUrl('/courses');
      })
    ).subscribe(
      noop,
      () => alert('Login Failed')
    );
  }


}
