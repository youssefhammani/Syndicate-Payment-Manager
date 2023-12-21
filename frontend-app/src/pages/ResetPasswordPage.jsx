import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import makeApiRequest from '../utils/makeAxiosRequest';
import Swal from 'sweetalert2';
import axios from 'axios';

const ResetPasswordPage = () => {
    const [user, setUser] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const [submitting, setSubmitting] = useState(false);

    const { token } = useParams();
    const location = useLocation();


    const decodedToken = token.replace(/\~/g, '.');
    const pathParts = location.pathname.split('/');
    pathParts[pathParts.length - 1] = decodedToken;
    const newPath = 'auth' + pathParts.join('/');

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
    };

    useEffect(() => {
        const submitData = async () => {
            try {
                const data = await makeApiRequest(newPath, user, 'post');
                console.log("data", data);
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your password has been updated. You can now log in with your new password.',
                }).then(() => {
                    window.location.href = '/login';
                });
            } catch (error) {
                console.log("error", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was an error updating your password. Please try again later.',
                });
            } finally {
                setSubmitting(false);
            }
        };

        if (submitting) {
            submitData();
        }
    }, [submitting, newPath, user]);

    return (
        <div className="bg-gray-200">
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-screen px-6">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-end items-end">
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg">
                            <div className="px-8 mb-4 text-center">
                                <h3 className="pt-4 mb-2 text-2xl">Reset Your Password</h3>
                                <p className="mb-4 text-sm text-gray-700">
                                    Please enter your new password and confirm it below.
                                </p>
                            </div>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleFormSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="newPassword"
                                        type="password"
                                        placeholder="Enter New Password..."
                                        name="newPassword"
                                        value={user.newPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="confirmPassword">
                                        Confirm Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm New Password..."
                                        name="confirmPassword"
                                        value={user.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Updating Password...' : 'Update Password'}
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="./register.html"
                                    >
                                        Create an Account!
                                    </a>
                                </div>
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="./index.html"
                                    >
                                        Already have an account? Login!
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

export default ResetPasswordPage;
