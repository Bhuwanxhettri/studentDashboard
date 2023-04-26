import NavBar from "@/component/NavBar";
import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Modal } from "antd";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getProfile = () => {
    api.get("/auth/users/me").then((res) => {
      setProfile(res.data);
    });
  };
  const okButtonProps = {
    className: "bg-blue-800", // add a custom class to the button
    size: "large", // set a custom size
    danger: false, // set a danger style
  };
  const [inputData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log(formData); // Here you can send your form data to your backend API
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <div className="flex">
        <div>
          <NavBar />
        </div>
        <div className="container mx-auto my-7 px-5 ml-52">
          <div className="md:flex no-wrap md:-mx-2 ">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mx-2">
              {/* Profile Card */}
              <div className="bg-white p-3 border-t-4 border-green-400">
                <div className="image overflow-hidden">
                  <img
                    className="h-auto w-full mx-auto"
                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                    alt=""
                  />
                </div>
                <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                  {profile?.firstName}
                </h1>

                <div>
                  <img
                    className="rounded-full w-16 mx-auto"
                    src={profile?.avatar}
                  />
                </div>

                <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li className="flex items-center py-3">
                    <span>Status</span>
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  </li>
                  <li className="flex items-center py-3">
                    <span>Member since</span>
                    <span className="ml-auto">Nov 07, 2016</span>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
              <div className="my-4" />
            </div>
            {/* Right Side */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              {/* Profile tab */}
              {/* About Section */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">About</span>
                  <button
                    onClick={() => {
                      showModal();
                    }}
                    className="mx-5 bg-blue-700 text-white rounded-md px-4 text-sm"
                  >
                    Edit
                  </button>
                  <Modal
                    title="Edit Profile"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={800}
                    onText="Edit"
                    okButtonProps={okButtonProps}
                  >
                    <>
                      {/* component */}
                      <div>
                        <div className="  rounded-lg ">
                          <div className="px-5 pb-5">
                            <div className="flex items-center gap-4">
                              <div className="w-[50%]">
                                {" "}
                                <input
                                  value={profile?.firstName}
                                  placeholder="First Name"
                                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                />
                              </div>
                              <div className="w-[50%]">
                                <input
                                  value={profile?.lastName}
                                  placeholder="Last Name"
                                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                />
                              </div>
                            </div>
                            <input
                              placeholder="Address"
                              className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                            />
                            <div className="flex items-center gap-4">
                              <div className="w-[50%]">
                                <input
                                  value={profile?.email}
                                  placeholder="Email"
                                  type="email"
                                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                />
                              </div>
                              <div className="w-[50%]">
                                <input
                                  placeholder="Phone Number"
                                  type="number"
                                  value={profile?.phoneNumber}
                                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            {/* component */}
                            <div className="flex w-full mx-5 my-1 items-center  bg-grey-lighter">
                              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-red-200 hover:text-blue-900">
                                <svg
                                  className="w-8 h-8"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">
                                  Select your Image
                                </span>
                                <input type="file" className="hidden" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  </Modal>
                </div>
                <div className="text-gray-700">
                  <div className="grid md:grid-cols-2 text-sm">
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">First Name</div>
                      <div className="px-4 py-2">Jane</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Batch</div>
                      <div className="px-4 py-2"></div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Gender</div>
                      <div className="px-4 py-2">Male</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Contact No.</div>
                      <div className="px-4 py-2">{profile?.phoneNumber}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">
                        Current Address
                      </div>
                      <div className="px-4 py-2">{profile.address}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold"></div>
                      <div className="px-4 py-2">
                        Arlington Heights, IL, Illinois
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Email.</div>
                      <div className=" py-2">
                        <a
                          className="text-blue-800"
                          href="mailto:jane@example.com"
                        >
                          {profile?.email}
                        </a>
                      </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Department</div>
                      <div className="px-4 py-2">
                        {profile && (
                          <>
                            {
                              profile?.classes[0].subjectId?.semesterId
                                ?.departmentId?.name
                            }
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End of about section */}
              <div className="my-4" />
              {/* Experience and education */}
              <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="grid grid-cols-2">
                  <div>
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                      <span clas="text-green-500">
                        <svg
                          className="h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path
                            fill="#fff"
                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                          />
                        </svg>
                      </span>
                      <span className="tracking-wide">Education</span>
                    </div>
                    <ul className="list-inside space-y-2">
                      <li>
                        <div className="text-teal-600">
                          Masters Degree in Oxford
                        </div>
                        <div className="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                      <li>
                        <div className="text-teal-600">
                          Bachelors Degreen in LPU
                        </div>
                        <div className="text-gray-500 text-xs">
                          March 2020 - Now
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* End of Experience and education grid */}
              </div>
              {/* End of profile tab */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
