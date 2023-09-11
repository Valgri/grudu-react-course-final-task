import React, { useReducer, useEffect, useState } from 'react';
import './Tweets.css';
import {DEFAULT_API, HTTP_STATUS_CREATED, HTTP_STATUS_OK} from '../utils/api';
import { SET_TWEET_TEXT,SET_ERROR, TWEET_REQUIRED_ERROR, TWEET_MAX_LENGTH } from '../utils/constants';
import Button from '../components/ui/Button';
import InputField from '../components/ui/Input';
import {Tweet, TweetAction, User} from '../utils/types'
import { Card } from 'react-bootstrap';
import { sanitizeHTML } from '../utils/validation'

// State and reducer
type State = {
    tweetText: string;
    errorMessage: string;
};
type TweetsProps = {
    currentUser: User | null,
};
const initialState: State = {
    tweetText: '',
    errorMessage: '',
};

const reducer = (state: State, action: TweetAction): State => {
    switch (action.type) {
        case SET_TWEET_TEXT:
            return { ...state, tweetText: action.payload, errorMessage: '' };
        case SET_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const Tweets: React.FC<TweetsProps> = ({ currentUser }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [tweets, setTweets] = useState<Tweet[]>([]);

    // Fetch tweets on component mount
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await fetch(`${DEFAULT_API}/tweets`);
                if (response.status === HTTP_STATUS_OK) {
                    const data = await response.json();
                    setTweets(data);
                } else {
                    console.error('Failed to fetch tweets.');
                }
            } catch (error) {
                console.error('An error occurred while fetching tweets.', error);
            }
        };

        fetchTweets();
    }, []);

    // Handle tweet creation
    const handleTweet = async () => {
        if (!state.tweetText) {
            dispatch({ type: SET_ERROR, payload: TWEET_REQUIRED_ERROR });
            return;
        }

        if (state.tweetText.length > TWEET_MAX_LENGTH) {
            dispatch({ type: SET_ERROR, payload: TWEET_REQUIRED_ERROR });
            return;
        }

        try {
            const userName = currentUser?.name || currentUser?.fullName || 'User name';
            const response = await fetch(`${DEFAULT_API}/tweets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: state.tweetText, author_id: userName }),
            });

            if (response.status === HTTP_STATUS_CREATED) {
                const data = await response.json();
                setTweets([data, ...tweets]);
                dispatch({ type: SET_TWEET_TEXT, payload: '' });
            } else {
                console.error('Failed to create tweet.');
            }
        } catch (error) {
            console.error('An error occurred while creating a tweet.', error);
        }
    };

    return (
        <div className="container mt-5 w-75">
            <h2 className="mb-4 h2">Tweets</h2>
            <InputField
                as='textarea'
                type="text"
                placeholder="What's happening?"
                value={state.tweetText}
                onChange={(e) => dispatch({ type: SET_TWEET_TEXT, payload: e.target.value })}
                error={state.errorMessage}
                className="mb-2"
            />
            <Button onClick={handleTweet} className='mb-4 d-flex ml-auto'>Tweet</Button>

            {tweets.map((tweet) => (
                <Card key={tweet.id} className='mb-4'>
                    <Card.Body>
                        <Card.Title>{tweet.author_id}</Card.Title>
                        <Card.Text dangerouslySetInnerHTML={sanitizeHTML(tweet.text)}/>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default Tweets;