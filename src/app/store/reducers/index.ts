import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as auth from './auth.reducer';
import {environment} from '../../../environments/environment';

export interface AppState {
  auth: auth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: auth.reducer
};
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
