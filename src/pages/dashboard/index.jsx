import NavBar from "@/component/NavBar";
import Attendance from "@/component/charts/Attendance";
import Reports from "@/component/charts/Reports";
import { AiOutlineCheckCircle, AiFillContainer } from "react-icons/ai";
import { GiTrophyCup } from "react-icons/gi";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import HitMaps from "@/component/charts/HitMaps";

const Result = () => {
  const [profile, setProfile] = useState("");
  const [progress, setProgress] = useState(0);
  const getProfile = () => {
    api.get("/auth/users/me").then((res) => {
      setProfile(res.data);
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const colorClass = progress >= 50 ? "bg-green-500" : "bg-blue-500";
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <NavBar />
      <div className="ml-56  px-5">
        <div className="flex justify-between  items-center">
          <div className="mt-5">
            <h3 className="text-red-600 font-bold text-2xl ">
              Welcome
              <span className="mx-2 text-sm text-blue-700">
                {" "}
                {profile?.firstName}
              </span>
            </h3>
            <p className="text-xs font-bold text-gray-600">
              Learn with Effectively with us!
            </p>
          </div>
          <div className="bg-blue-900 mt-5 rounded-xl flex gap-10 items-center px-5 py-2 text-white">
            <div className="">
              <GiTrophyCup size={34} className="text-yellow-400" />
            </div>
            <div className="">
              20
              <p>Total Points</p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center pt-5 ">
          <div className="px-10 py-10 text-white font-bold rounded-md shadow-md bg-gradient-to-r from-zinc-300 to-indigo-600">
            <AiOutlineCheckCircle size={24} className="mt-[-20px] " />
            <p className="text-3xl font-serif font-bold mb-3 pt-4 text-black">
              {" "}
              23
            </p>
            Complated Course
          </div>
          <div className="px-10 py-10 text-white font-bold rounded-md shadow-md bg-gradient-to-r from-amber-200 to-yellow-500">
            <AiFillContainer size={24} className="mt-[-20px] " />
            <p className="text-3xl font-serif font-bold pt-4 text-black mb-3">
              4
            </p>
            in progress Course
          </div>
          <div className="px-10 py-10 text-white font-bold rounded-md shadow-md bg-gradient-to-r from-fuchsia-600 to-pink-600">
            <AiOutlineCheckCircle size={24} className="mt-[-20px] " />
            <p className="text-3xl font-serif font-bold pt-4 text-black mb-3">
              15
            </p>
            Registered Course
          </div>
          <div className="bg-white ml-16 mt-[10px] shadow-md  py-2 rounded-lg">
            <h1 className="text-purple-900 font-bold text-xl font-serif mx-4">
              Attendance
            </h1>
            <Attendance />
          </div>
        </div>
        <div className=" flex gap-24 my-5">
          <div className="bg-white p-3 h-[75vh] rounded-md shadow-xl">
            <h2 className="text-xl font-bold font-serif mx-5 py-2">Reports</h2>
            <Reports />
          </div>
          <div className="bg-gradient-to-r  from-purple-400 via-pink-500 to-red-500 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Notice Board</h2>
            <ul className="space-y-4 h-[60vh] px-5  overflow-y-auto">
              <li className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Important Notice
                </h3>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </li>
              <li className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Upcoming Event
                </h3>
                <p className="text-gray-700">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.
                </p>
              </li>
              <li className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reminder
                </h3>
                <p className="text-gray-700">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </li>
              <li className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reminder
                </h3>
                <p className="text-gray-700">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </li>
              <li className="bg-white rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reminder
                </h3>
                <p className="text-gray-700">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white mb-10 w-full rounded-md p-5 shadow-lg">
          <h1 className="text-xl font-bold font-serif mx-5 py-2">
            Daily Activity
          </h1>
          <HitMaps />
        </div>
      </div>
    </>
  );
};

export default Result;
