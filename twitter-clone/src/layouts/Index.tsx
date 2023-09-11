import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import {User} from "../utils/types";

interface LayoutProps {
    onClick: () => void; // Define the onClick function's type
    currentUser: User | null,
}

const Layout: React.FC<LayoutProps> = ({ children, onClick, currentUser }) => {
    return (
        <div className='min-vh-100 d-flex flex-column'>
            <Navbar bg="secondary" variant="dark" expand="lg" className='h-25'>
                <Container>
                    <Navbar.Brand href="#">Twitter clone app</Navbar.Brand>
                    <p className='ml-auto mb-0 mr-10 text-light'>{currentUser?.name || currentUser?.fullName}</p>
                    <Button variant="danger" onClick={onClick}>
                        Logout
                    </Button>
                </Container>
            </Navbar>

            <Container fluid className='flex-column d-flex'>{children}</Container>
        </div>
    );
};

export default Layout;