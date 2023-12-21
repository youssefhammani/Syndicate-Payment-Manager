import React, { useState } from 'react'
import makeApiRequest from '../utils/makeAxiosRequest';

const LoginPage = () => {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in...', user);
        makeApiRequest('auth/login', user, 'post')
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        // <body className="font-mono bg-gray-400">
        <div className="bg-gray-200">
            <div className="container mx-auto">
                <div className="flex justify-center items-center h-screen px-6">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex justify-end items-end">
                        {/* <div
                            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                            style={{ backgroundImage: "url('https://source.unsplash.com/K4mSJ7kc0As/600x800')" }}
                        ></div> */}
                        <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="exampel@gmail.com"
                                        name='email'
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-start text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="******************"
                                        name='password'
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                                </div>
                                <div className="mb-4">
                                    <input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
                                    <label className="text-sm" htmlFor="checkbox_id">
                                        Remember Me
                                    </label>
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                        type="submit"
                                    >
                                        Sign In
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="./registerml"
                                    >
                                        Create an Account!
                                    </a>
                                </div>
                                <div className="text-center">
                                    <a
                                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                                        href="/forgot-password"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </body>
    );
}

export default LoginPage