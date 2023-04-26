import React from "react";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineUserDelete,
  AiOutlineWallet,
  AiOutlineRise,
  AiOutlineLogout,
  AiOutlineAppstore,
  AiOutlineAccountBook,
} from "react-icons/ai";

import { BsChatLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
const NavBar = () => {
  const disptch = useDispatch();
  return (
    <>
      <nav className=" bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg w-52 h-screen fixed">
        <div className="">
          <div className="">
            <div>
              <h2 className="text-white px-5 text-xl font-bold font-serif py-3">
                <span className="font-bold text-black text-2xl">School</span>{" "}
                <span className="font-bold text-sm"> Sphare</span>
              </h2>
            </div>
            <div className="">
              <ul className="px-5 text-white gap-4">
                <Link href="/dashboard">
                  <li className="p-4   hover:text-yellow-600 duration-200 cursor-pointer active">
                    <div className="flex justify-start gap-4 items-center">
                      <div>
                        <AiOutlineAppstore size={25} />
                      </div>
                      <div>
                        <span className="text-md">Dashboard</span>
                      </div>
                    </div>
                  </li>
                </Link>
                <Link href="/courses">
                  <li className="p-4   hover:text-yellow-600 duration-200 cursor-pointer active">
                    <div className="flex justify-start gap-4 items-center">
                      <div>
                        <AiOutlineAccountBook size={25} />
                      </div>
                      <div>
                        <span className="text-md">Courses</span>
                      </div>
                    </div>
                  </li>
                </Link>

                <Link href="/profile">
                  <li className="p-4   hover:text-yellow-600 duration-200 cursor-pointer active">
                    <div className="flex justify-start gap-4 items-center">
                      <div>
                        <AiOutlineUserDelete size={25} />
                      </div>
                      <div>
                        <span className="text-md">Profiles</span>
                      </div>
                    </div>
                  </li>
                </Link>

                <Link href="/assignment">
                  <li className="p-4   hover:text-yellow-600 duration-200 cursor-pointer active">
                    <div className="flex justify-start gap-4 items-center">
                      <div>
                        <AiOutlineWallet size={25} />
                      </div>
                      <div>
                        <span onClick={() => {}} className="text-md">
                          Assignemt
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>

                <Link href="/message">
                  <li className="p-4   hover:text-yellow-600 duration-200 cursor-pointer active">
                    <div className="flex justify-start gap-4 items-center">
                      <div>
                        <BsChatLeft size={25} />
                      </div>
                      <div>
                        <span className="text-md cursor-pointer">Message</span>
                      </div>
                    </div>
                  </li>
                </Link>

                <Link
                  onClick={() => {
                    disptch(logout());
                  }}
                  href="/signin"
                >
                  <li className="p-4   hover:text-yellow-600 duration-200 cursor-pointer active">
                    <div className="flex justify-start gap-4 items-center">
                      <div>
                        <AiOutlineLogout size={25} />
                      </div>
                      <div>
                        <span className="text-md cursor-pointer">Logout</span>
                      </div>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
