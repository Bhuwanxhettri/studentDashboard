import React, { useState } from 'react';
import api from '../api/axios';
import { useRouter } from "next/router";

const index = () => {
    const [showOTPForm, setShowOTPForm] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(null);
    const [newPassword, SetNewpassword] = useState("");
    const [isPassword, setPssword] = useState(false);
    const router = useRouter();

    const handleResetPassword = async () => {
        try {
            const res = await api.post("/auth/forget-password", {
                email: email
            });
            if (res) {
                setShowOTPForm(true);
            }
        } catch (err) {
            console.log(err);
        }
        // Perform any necessary logic for sending OTP here
    };

    const sendOtpPassword = async () => {
        try {
            const res = await api.post("/auth/reset-password", {
                otp: otp,
                password: newPassword
            });
            if (res) {
                router.push("/sigin");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="antialiased bg-slate-200">
                <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h1 className="text-4xl font-medium">Reset password</h1>
                    <p className="text-slate-500">Fill up the form to reset the password</p>

                    {showOTPForm ? <>

                        {
                            isPassword ? <>
                                <section className="bg-gray-50 dark:bg-gray-900">
                                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                                        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                                            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                                Change Password
                                            </h2>
                                            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                                                <div>
                                                    <label
                                                        htmlFor="password"
                                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                    >
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        onChange={(e) => { SetNewpassword(e.target.value) }}
                                                        placeholder="••••••••"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        required=""
                                                    />
                                                </div>
                                                <button
                                                    onClick={sendOtpPassword}
                                                    className="w-full bg-blue-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                                >
                                                    Change Passwod
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>


                            </> : <>
                                <div className="my-10">
                                    <div className="flex flex-col space-y-5">
                                        <label htmlFor="otp">
                                            <p className="font-medium text-slate-700 pb-2">Enter OTP</p>
                                            <input
                                                id="otp"
                                                name="otp"
                                                onChange={(e) => { setOtp(e.target.value) }}
                                                type="text"
                                                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                                placeholder="Enter OTP"
                                            />
                                        </label>
                                        <button
                                            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                                            type="submit"
                                            onClick={() => { setPssword(true) }}
                                        >
                                            <span>Submit OTP</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        }


                    </> : (
                        <div>
                            <div className="flex flex-col space-y-5">
                                <label htmlFor="email">
                                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                                    <input
                                        id="email"
                                        name="email"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                        type="email"
                                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                        placeholder="Enter email address"
                                    />
                                </label>

                                <button
                                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                                    type="button"
                                    onClick={handleResetPassword}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                        />
                                    </svg>
                                    <span>Reset password</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {
                        isPassword && <>


                        </>
                    }


                </div>
            </div>
        </div>
    );
};

export default index;
