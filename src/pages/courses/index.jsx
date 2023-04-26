import Card from "../../component/Card";
import NavBar from "@/component/NavBar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import book from "../../assets/icon/book.png";
import teacher from "../../assets/icon/teacher.png";
import miss from "../../assets/icon/miss.png";
import baord from "../../assets/icon/board.png";
import { fetcher } from "../api";
import api from "../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "antd";
import { SiGoogleclassroom } from "react-icons/si";

const Home = () => {
  const [subjects, setSubjets] = useState([]);
  const [classCode, setClassCode] = useState("");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assignment, setAssignment] = useState([]);
  const [notes, setNotes] = useState([]);
  const okButtonProps = {
    className: "bg-red-400", // add a custom class to the button
    size: "large", // set a custom size
    danger: true, // set a danger style
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // api functions
  const getProfile = () => {
    api.get("/auth/users/me").then((res) => {
      setProfile(res.data);
    });
  };
  const getAllSubjet = async () => {
    const data = await fetcher("/student/subject");
    if (data) {
      setSubjets(data);
    }
  };
  const getAllAssignment = async () => {
    const data = await fetcher("/student/assignment");
    if (data) {
      setAssignment(data);
    }
  };
  const getAllNotes = async () => {
    const data = await fetcher("/student/notes");
    if (data) {
      setNotes(data);
    }
  };

  const joinClass = async () => {
    if (classCode != "") {
      const res = await api.post("/student/class", {
        classCode: classCode,
      });
      if (res) {
        console.log(res);
      }
    } else {
      setError("Enter your class code");
    }
  };

  useEffect(() => {
    getProfile();
    getAllSubjet();
    getAllAssignment();
    getAllNotes();
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <NavBar />
        </div>
        <div className="ml-56 mt-5 px-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div>
                <span className="inline">
                  {" "}
                  <SiGoogleclassroom size={34} className="text-yellow-400" />
                </span>
              </div>
              <div>
                <h3 className="text-lg inline text-indigo-600 font-extrabold font-mono">
                  ClassRoom
                </h3>
              </div>
            </div>
            <div className="flex  items-center gap-4 justify-end">
              <div onClick={showModal} className="cursor-pointer">
                <AiOutlinePlus size={22} />
              </div>
              <div>
                <img
                  className="rounded-full w-10 mx-auto"
                  src={profile?.avatar}
                />
              </div>
            </div>
          </div>
          <section>
            <h4 className="text-xl my-8 font-sans font-bold text-[#0c546a]">
              My courses
            </h4>
            <hr></hr>
            <div className="grid grid-cols-4 gap-4 my-8">
              {subjects.length > 0 && (
                <>
                  {subjects?.map((subject, id) => {
                    return (
                      <>
                        <div>
                          <Card
                            img={"https://wallpapercave.com/wp/wp2036900.jpg"}
                            name={subject?.subject_name}
                          />
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </section>
          <div>
            <h4 className="text-xl my-3 font-sans font-bold text-[#094354]">
              Your Assignment
            </h4>
            <hr></hr>

            <div className="grid grid-cols-4 gap-4 my-8">
              <div className="cursor-pointer rounded-xl shadow-md bg-slate-100 p-5">
                <h4 className="text-[#124748] font-bold">English Lesson 2</h4>
                <span className="text-gray-600 text-xs">Question & Answer</span>
              </div>
              <div className=" cursor-pointer rounded-xl shadow-md bg-slate-100 p-5">
                <h4 className="text-[#124748] font-bold">English Lesson 2</h4>
                <span className="text-gray-600 text-xs">Question & Answer</span>
              </div>
              <div className="cursor-pointer rounded-xl shadow-md bg-slate-100 p-5">
                <h4 className="rounded-xl  text-[#124748] font-bold">
                  English Lesson 2
                </h4>
                <span className="text-gray-600 text-xs">Question & Answer</span>
              </div>
              <div className=" cursor-pointer rounded-xl shadow-md  bg-slate-100 p-5">
                <h4 className="text-[#124748] font-bold">English Lesson 2</h4>
                <span className="text-gray-600 text-xs">Question & Answer</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl my-3 font-sans font-bold text-[#094354]">
              Notes For you
            </h4>
            <hr></hr>
            <div className="grid grid-cols-4 gap-4 my-8">
              <div className="cursor-pointer rounded-xl shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5">
                <div className="flex items-center py-2 justify-between">
                  <div>
                    <h4 className="text-[#180909] font-bold">
                      English Lesson 2
                    </h4>
                    <span className="text-[#ffff] text-xs">
                      Question & Answer
                    </span>
                  </div>
                  <div>
                    <Image
                      src={book}
                      alt="Picture of the author"
                      width={65}
                      height={65}
                    />
                  </div>
                </div>
              </div>
              <div className=" cursor-pointer rounded-xl shadow-md bg-gradient-to-r from-teal-200 to-teal-500 p-5">
                <div className="flex items-center py-2 justify-between">
                  <div>
                    <h4 className="text-[#180909]  font-bold">
                      English Lesson 2
                    </h4>
                    <span className="text-[#ffff] text-xs">
                      Question & Answer
                    </span>
                  </div>
                  <div>
                    <Image
                      src={teacher}
                      alt="Picture of the author"
                      width={65}
                      height={65}
                    />
                  </div>
                </div>
              </div>
              <div className="cursor-pointer rounded-xl shadow-md bg-gradient-to-r from-cyan-500 to-blue-500  p-5">
                <div className="flex items-center py-2 justify-between">
                  <div>
                    <h4 className="text-[#180909]  font-bold">
                      English Lesson 2
                    </h4>
                    <span className="text-[#ffff] text-xs">
                      Question & Answer
                    </span>
                  </div>
                  <div>
                    <Image
                      src={miss}
                      alt="Picture of the author"
                      width={65}
                      height={65}
                    />
                  </div>
                </div>
              </div>
              <div className=" cursor-pointer rounded-xl shadow-md  bg-gradient-to-l from-violet-600 via-red-300 to-indigo-700 p-5">
                <div className="flex items-center py-2 justify-between">
                  <div>
                    <h4 className="text-[#180909]  font-bold">
                      English Lesson 2
                    </h4>
                    <span className="text-[#ffff] text-xs">
                      Question & Answer
                    </span>
                  </div>
                  <div>
                    <Image
                      src={baord}
                      alt="Picture of the author"
                      width={65}
                      height={65}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="
          Ask your teacher for the class code, then enter it here."
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Join"
          okButtonProps={okButtonProps}
        >
          <input
            className="px-7 w-full rounded-md py-2 border border-blue-900"
            placeholder="Enter Class Code"
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
