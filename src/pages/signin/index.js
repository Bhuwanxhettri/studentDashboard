import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../../store/features/authSlice";
import { useRouter } from "next/router";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in the inputs");
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    setLoading(true);
    setError("");
    if (validateForm()) {
      try {
        const res = await api.post("/auth/login", { email, password });
        if (res) {
          localStorage.setItem("isLoggedIn", true);
          router.push("/dashboard");
          dispatch(login(res?.data));
        }
        setError(res?.data.message);
      } catch (err) {
        setError(err?.response?.data.message);
        console.log(err);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              {error && <p className="text-red-600">{error}</p>}
              <div>
                <h1 className="text-2xl font-semibold">
                  Shool Sphare Student Portal System{" "}
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                        id="email"
                        className="peer my-5 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autoComplete="off"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        name="password"
                        className="peer my-5 placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        onClick={() => {
                          handleLogin();
                        }}
                        disabled={loading}
                        className="bg-blue-500 w-full text-white rounded-md px-2 py-1"
                      >
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
