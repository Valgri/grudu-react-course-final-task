import React from 'react';
import { Form } from 'react-bootstrap';
import ErrorMessage from '../ui/ErrorMessage';

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | null;
    className?: string;
    as?: 'input' | 'select' | 'textarea';
}

const InputField: React.FC<InputFieldProps> = ({
   type,
   placeholder,
   value,
   onChange,
   error,
   className,
   as= 'input',
   }) => (
    <Form.Group>
        <Form.Control
            as={as}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isInvalid={!!error}
            className={className}
        />
        {error && <ErrorMessage message={error} />}
    </Form.Group>
);

export default InputField;