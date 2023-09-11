import React from 'react';
import { Alert } from 'react-bootstrap';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <Alert variant="danger" className="mt-2">
        {message}
    </Alert>
);

export default ErrorMessage;