import { createSelector } from '../../../node_modules/@ngrx/store';


export const selectAuthState = state => state.auth;


export const isLoggedIn = createSelector (
    selectAuthState,
    auth => auth.loggedIn
);

export const isLoggedOut = createSelector (
    isLoggedIn,
    logging => !logging
);
