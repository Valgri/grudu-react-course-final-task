import {SET_EMAIL, SET_ERROR, SET_NAME, SET_PASSWORD, SET_TWEET_TEXT} from "./constants";

export interface State {
    email: string;
    password: string;
    emailError: string;
    passwordError: string;
    errorMessage: string;
}
export interface User {
    id: string,
    name?: string,
    email: string,
    fullName?: string,
}
 type payloadState = {
    value: string, error: string,
 }

export type ErrorAction = { type: typeof SET_ERROR; payload: string };

export type Action =
    | { type: typeof SET_EMAIL; payload: payloadState }
    | { type: typeof SET_PASSWORD; payload: payloadState }
    | ErrorAction
    | { type: typeof SET_NAME; payload: payloadState };


export type TweetAction = { type: typeof SET_TWEET_TEXT; payload: string } | ErrorAction;



export interface StateSignUp extends State {
    fullName: string;
    fullNameError: string;
};


export interface Tweet {
    id: string;
    author_id: string;
    text: string;
}
