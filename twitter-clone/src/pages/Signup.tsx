import React, { useReducer } from 'react';
import {validateEmail, validatePassword, validateFullName } from "../utils/validation";
import InputField from "../components/ui/Input";
import {
    EMAIL_INVALID_FORMAT,
    EMAIL_REQUIRED_ERROR, FULLNAME_INVALID_FORMAT, FULLNAME_REQUIRED_ERROR, PASSWORD_INVALID_FORMAT,
    PASSWORD_REQUIRED_ERROR,
    SET_EMAIL, SET_ERROR, SET_ERROR_TEXT,
    SET_NAME,
    SET_PASSWORD
} from "../utils/constants";
import {Action, StateSignUp, User} from "../utils/types";
import Button from "../components/ui/Button";
import {DEFAULT_API, HTTP_STATUS_CREATED} from "../utils/api";

type SignupProps = {
    onSignupSuccess: onSignupSuccessType;
};
export type onSignupSuccessType = (user: User) => void;


const initialState: StateSignUp = {
    email: '',
    password: '',
    fullName: '',
    emailError: '',
    passwordError: '',
    fullNameError: '',
    errorMessage: '',
};

const reducer = (state: StateSignUp, action: Action): StateSignUp => {
    switch (action.type) {
        case SET_EMAIL:
            return { ...state, email: action.payload.value, emailError: action.payload.error };
        case SET_PASSWORD:
            return { ...state, password: action.payload.value, passwordError: action.payload.error };
        case SET_NAME:
            return { ...state, fullName: action.payload.value, fullNameError: action.payload.error };
        default:
            return state;
    }
}

const Signup: React.FC<SignupProps> = ({ onSignupSuccess }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSignup = async () => {
        // Validate email, password, and full name
        let isValid = true;

        if (!state.email) {
            dispatch({ type: SET_EMAIL, payload: { value: state.email, error: EMAIL_REQUIRED_ERROR } });
            isValid = false;
        } else if (!validateEmail(state.email)) {
            dispatch({ type: SET_EMAIL, payload: { value: state.email, error: EMAIL_INVALID_FORMAT } });
            isValid = false;
        }

        if (!state.password) {
            dispatch({ type: SET_PASSWORD, payload: { value: state.password, error: PASSWORD_REQUIRED_ERROR } });
            isValid = false;
        } else if (!validatePassword(state.password)) {
            dispatch({ type: SET_PASSWORD, payload: { value: state.password, error: PASSWORD_INVALID_FORMAT } });
            isValid = false;
        }

        if (!state.fullName) {
            dispatch({ type: SET_NAME, payload: { value: state.fullName, error: FULLNAME_REQUIRED_ERROR }  });
            isValid = false;
        } else if (!validateFullName(state.fullName)) {
            dispatch({ type: SET_NAME, payload: { value: state.fullName, error: FULLNAME_INVALID_FORMAT } });
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        try {
            // Perform signup API request here
            const response: Response = await fetch(`${DEFAULT_API}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: state.email,
                    password: state.password,
                    fullName: state.fullName,
                }),
            });
            if (response.status === HTTP_STATUS_CREATED) {
                onSignupSuccess(await response.json()); // Redirect to the "Tweets" page
            } else {
                dispatch({ type: SET_ERROR, payload: SET_ERROR_TEXT });
            }
        } catch (error) {
            dispatch({ type: SET_ERROR, payload: SET_ERROR_TEXT  });
        }
    };

    return (
        <div className="w-50 p-4 m-auto">
            <h2 className="mb-4 h2">Sign up</h2>
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
                className="mb-2"
            />
            <InputField
                type="text"
                placeholder="Full Name"
                value={state.fullName}
                onChange={(e) => dispatch({ type: SET_NAME, payload: { value: e.target.value, error: '' } })}
                error={state.fullNameError}
                className="mb-4"
            />
            <Button onClick={handleSignup} className='button-end'>
                Signup
            </Button>
            {state.errorMessage && <p className="text-danger text-sm mt-2">{state.errorMessage}</p>}
        </div>
    );
};

export default Signup;





