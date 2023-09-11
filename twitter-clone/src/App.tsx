import React, { Fragment, useState, useEffect } from 'react';
import Login, { OnLoginSuccessType } from './pages/Login'; // Your Login component
import Signup, { onSignupSuccessType } from './pages/Signup'; // Your Signup component
import Tweets from './pages/Tweets'; // The Tweets page you want to create
import './App.css';
import Layout from './layouts/Index';
import Button from 'react-bootstrap/Button';
import {User} from "./utils/types";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(true); // Track which component to display
    const [currentUserState, setCurrentUserState] = useState<User | null>(null); // Track which component to display

    // Load user data from localStorage on component mount
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess: OnLoginSuccessType = (user: User) => {
        // Store user data in localStorage
        localStorage.setItem('user', 'loggedIn');
        setCurrentUserState(user)
        setIsLoggedIn(true);
    };

    const handleSignupSuccess: onSignupSuccessType = (user: User) => {
        // Store user data in localStorage
        localStorage.setItem('user', 'loggedIn');
        setCurrentUserState(user)
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');
        setCurrentUserState(null);
        setIsLoggedIn(false);
    };

    const toggleComponent = () => {
        // Toggle between Login and Signup components
        setShowLogin(!showLogin);
    };

    return (
        <div>
            {isLoggedIn ? (
                <Layout onClick={handleLogout} currentUser={currentUserState}>
                    <Tweets currentUser={currentUserState}/>
                </Layout>
            ) : (
                <div className='auth'>
                    {showLogin ? (
                        <Login onLoginSuccess={handleLoginSuccess} />
                    ) : (
                        <Signup onSignupSuccess={handleSignupSuccess} />
                    )}
                    <div className='d-flex align-content-start justify-content-center'>
                        {showLogin ? "Don't have an account?" : 'Already have an account?'}
                        <Button variant="link" onClick={toggleComponent} className='px-1 py-0'>
                            {showLogin ? 'Sign up' : 'Log in'}
                        </Button>
                    </div>

                </div>
            )}
        </div>
    );
}

export default App;