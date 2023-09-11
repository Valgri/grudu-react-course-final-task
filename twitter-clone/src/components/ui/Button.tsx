import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

type ButtonProps = {
    children: React.ReactNode;
    className?: string,
    onClick?: () => void; // Define the onClick prop as a function with no arguments
};

const Button: React.FC<ButtonProps> = ({ children, onClick, ...props }) => {
    return (
        <BootstrapButton variant="primary" onClick={onClick} {...props}>
            {children}
        </BootstrapButton>
    );
};

export default Button;