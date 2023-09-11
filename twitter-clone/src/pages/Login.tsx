import React, { useReducer } from 'react';
import {
    SET_EMAIL,
    SET_PASSWORD,
    SET_ERROR,
    EMAIL_REQUIRED_ERROR,
    PASSWORD_REQUIRED_ERROR,
    EMAIL_INVALID_FORMAT, PASSWORD_INVALID_FORMAT, SET_ERROR_TEXT, SET_ERROR_EMAIL_OR_PASS
} from '../utils/constants'
import {State, Action, User} from "../utils/types";
import './Login.css';
import InputField from "../components/ui/Input";
import {validateEmail, validatePassword} from '../utils/validation'
import Button from "../components/ui/Button";
import { DEFAULT_API, HTTP_STATUS_OK, HTTP_STATUS_NOT_FOUND } from "../utils/api";



type LoginProps = {
    onLoginSuccess: OnLoginSuccessType;
};

export type OnLoginSuccessType = (user: User) => void;

const initialState: State = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: '',
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.payload.value, emailError: action.payload.error };
        case SET_PASSWORD:
            return { ...state, password: action.payload.value, passwordError: action.payload.error };
        case SET_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleLogin = async () => {
        let isValid = true;

        if (!state.email) {
            dispatch({ type: SET_EMAIL, payload: { value: state.email, error: EMAIL_REQUIRED_ERROR } });
            isValid = false;
        } else if (!validateEmail(state.email)) {
            dispatch({ type: SET_EMAIL, payload: { value: state.email, error: EMAIL_INVALID_FORMAT }  });
            isValid = false;
        }

        if (!state.password) {
            dispatch({ type: SET_PASSWORD, payload: { value: state.password, error: PASSWORD_REQUIRED_ERROR } });
            isValid = false;
        } else if (!validatePassword(state.password)) {
            dispatch({ type: SET_PASSWORD, payload: { value: state.password, error: PASSWORD_INVALID_FORMAT } });
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            // Perform login API request here
            const username = state.email; // Assuming the email is used as the username
            const password = state.password;

            // Simulate a GET request to check if the user exists
            const userResponse = await fetch(`${DEFAULT_API}/users/${username.split('@')[0]}`);

            switch (userResponse.status) {
                case HTTP_STATUS_OK:
                    // User exists, let's check the password (simulated)
                    const userData = await userResponse.json();
                    if (userData) {
                        onLoginSuccess(userData);
                    } else {
                        // Incorrect password
                        dispatch({ type: SET_ERROR, payload: SET_ERROR_EMAIL_OR_PASS });
                    }
                    break;
                case HTTP_STATUS_NOT_FOUND:
                    // User not found
                    dispatch({ type: SET_ERROR, payload: SET_ERROR_EMAIL_OR_PASS });
                    break;
                default:
                    // Something went wrong with the request
                    dispatch({ type: SET_ERROR, payload: SET_ERROR_TEXT });
                    break;
            }
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: SET_ERROR_TEXT });
        }
    };

    return (
        <div className="w-50 p-4 m-auto">
            <h2 className="mb-4 h2">Log in</h2>
            <InputField
                type="text"
                placeholder="Email"
                value={state.email}
                onChange={(e) => dispatch({ type: SET_EMAIL, payload: { value: e.target.value, error: '' } })}
                error={state.emailError}
                className="mb-2"
            />
            <InputField
                type="password"
                placeholder="Password"
                value={state.password}
                onChange={(e) => dispatch({ type: SET_PASSWORD, payload: { value: e.target.value, error: '' } })}
                error={state.passwordError}
                className="mb-4"
            />
            <Button onClick={handleLogin} className='button-end'>Login</Button>
            {state.errorMessage && <p className="text-danger mt-2">{state.errorMessage}</p>}
        </div>
    );
};

export default Login;