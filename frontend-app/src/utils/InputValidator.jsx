import React, { useState, useEffect } from 'react';

const InputValidator = ({ name, value, validationRules, errorMessage, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState('');
    const [hasInput, setHasInput] = useState(false);

    useEffect(() => {
        let valid = true;
        setError('');
        for (let rule of validationRules) {
            if (!rule.regex.test(value)) {
                setError(rule.errorMessage);
                valid = false;
                break;
            }
        }
        setIsValid(valid);
    }, [value, validationRules, name]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleChange = (e) => {
        const { value } = e.target;
        setHasInput(value.length > 0);
        onChange(name, value, isValid);
    };

    const getBorderColorClass = () => {
        if (!hasInput) {
            return 'border-blue-500';
        } else if (isValid) {
            return 'border-green-500';
        } else {
            return 'border-red-500';
        }
    }

    return (
        <>
            <input
                name={name}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 mb-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${getBorderColorClass()}`}
            />
            {hasInput && !isValid && <p className="text-red-500 text-xs italic">{error}</p>}
        </>
    );
};

export default InputValidator;
