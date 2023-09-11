import DOMPurify from 'dompurify';

export const validateEmail = (email) => {
    // You can use a regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return password.length >= 8 && password.length <= 256;
};

export const validateFullName = (fullName) => {
    return fullName.length >= 1 && fullName.length <= 512;
};

export function sanitizeHTML(html) {
    return { __html: DOMPurify.sanitize(html) };
}