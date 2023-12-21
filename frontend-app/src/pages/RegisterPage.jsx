import React, { useState, useRef } from 'react';
import makeApiRequest from '../utils/makeAxiosRequest';
import InputValidator from '../utils/InputValidator';
import Swal from 'sweetalert2';
import '../App.css';


const RegisterPage = () => {
    const formRef = useRef(null);
    const [showRoles, setShowRoles] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Client',
    });
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleRolesClick = () => {
        setShowRoles(true);
    };

    const handleChange = (name, value, isValid) => {
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (name === 'confirmPassword' && value !== user.password) {
            setErrors((prevState) => ({
                ...prevState,
                [name]: 'Passwords do not match',
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                [name]: isValid ? '' : `Invalid ${name}`,
            }));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!Object.values(errors).some(error => error)) {
            try {
                const data = await makeApiRequest('auth/register', user, 'post');
                console.log(data);
                Swal.fire({
                    icon: 'success',
                    title: 'Registration successful',
                    text: 'You have successfully registered.',
                });
                // Redirect to login page or clear form here
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration failed',
                    text: 'An error occurred during registration.',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Validation failed',
                text: 'Please correct the errors in the form.',
            });
        }
    };

    const isFormValid = () => {
        const allErrorsCleared = Object.values(errors).every((error) => error === '');
        const allFieldsFilled = Object.values(user).every((value) => value !== '');
        const passwordsMatch = user.password === user.confirmPassword;

        return allFieldsFilled && allErrorsCleared && passwordsMatch;
    };

    return (
        <div className="bg-gray-200 font-family-karla h-screen">
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-screen px-6">
                    <div className="w-full xl:w-3/5 lg:w-11/12 flex justify-end items-end">
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit} ref={formRef}>
                                <div className="mb-4 ">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="firstName">
                                            Username
                                        </label>
                                        <InputValidator
                                            name="username"
                                            value={user.username}
                                            validationRules={[
                                                {
                                                    regex: /^[^\s]{3,}$/,
                                                    errorMessage: 'Username must be at least 4 characters long and must not contain spaces',
                                                },
                                            ]}
                                            errorMessage={errors.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <InputValidator
                                        name="email"
                                        value={user.email}
                                        validationRules={[
                                            {
                                                regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                errorMessage: 'Email address is invalid',
                                            },
                                        ]}
                                        errorMessage={errors.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="password">
                                            Password
                                        </label>
                                        <InputValidator
                                            name="password"
                                            value={user.password}
                                            validationRules={[
                                                {
                                                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{7,}$/,
                                                    errorMessage: 'Password must be at least 8 characters long and contain at least one (a-z), (A-Z), (0-9), and one special character',
                                                },
                                            ]}
                                            errorMessage={errors.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <InputValidator
                                            name="confirmPassword"
                                            value={user.confirmPassword}
                                            validationRules={[
                                                {
                                                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{7,}$/,
                                                    errorMessage: 'Passwords do not match',
                                                },
                                            ]}
                                            errorMessage={errors.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="roles" className="block mb-2 text-start text-sm font-bold text-gray-700">
                                        Roles
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="roles"
                                            name="role"
                                            value={user.role}
                                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                                            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${showRoles ? 'block' : 'hidden'}`}
                                        >
                                            <option value="Client">Client</option>
                                            <option value="Livreur">Livreur</option>
                                            <option value="Manager">Admin</option>
                                        </select>
                                        <div
                                            className={`w-full px-3 py-2 text-center text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${showRoles ? 'hidden' : 'block'}`}
                                            onClick={handleRolesClick}
                                        >
                                            Select a role
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={!isFormValid()}
                                    >
                                        Register Account
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/forgot-password">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="text-center">
                                    Already have an account?
                                    <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800" href="/login">
                                        Login!
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
