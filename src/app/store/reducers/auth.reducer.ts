import {User} from '../../_models';
import {AuthActions, AuthActionTypes} from '../auth.actions';


export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          id: action.payload.id,
          phone: action.payload.phone,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          isRegistrationFinish: action.payload.isRegistrationFinish,
          isTutorialFinish: action.payload.isTutorialFinish,
      },
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
          id: action.payload.id,
          phone: action.payload.phone,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          isRegistrationFinish: action.payload.isRegistrationFinish,
          isTutorialFinish: action.payload.isTutorialFinish,
        },
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
