import Card from "../../component/Card";
import NavBar from "@/component/NavBar";
import React, { useEffect, useState } from "react";

import { fetcher } from "../api";
import api from "../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "antd";
import { SiGoogleclassroom } from "react-icons/si";
import { message } from "antd";
import Link from "next/link";
const Home = () => {
  const images = [
    "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80",
    "https://plus.unsplash.com/premium_photo-1684444605542-93725082d214?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    "https://www.wikihow.com/images/thumb/1/18/Take-Better-Notes-Step-1-Version-2.jpg/v4-460px-Take-Better-Notes-Step-1-Version-2.jpg.webp",
    "https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png",
    "https://uploads-ssl.webflow.com/5ad143610f7efd77b6f188f3/5e3d6dc6a5399caacdecc754_TDo4dlBwPnYdHabfakoZWUb2-zaHC2Ebj6wTcAQrDcLJPJtier6s7zejNCDzu44b8Pn9miZ0go7GndFC3fBONs16ZPixxSdvdzzwBF1JVaDnQgWlOSFUCUzCziUM7PyZBmi1jfxC.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi5d0zfemSuge8n5fiPd1GnW_SRwtQ4xLwvICjW66lUUZzJ7Kg2tXjX5qHK1vTy2O8bSg&usqp=CAU",
  ];
  const [subjects, setSubjets] = useState([]);
  const [classCode, setClassCode] = useState("");
  const [relodePage, setRelodePage] = useState(false);
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
        message.success("Class Join sucess fully!");
        setRelodePage(true);
      }
    } else {
      setError("Enter your class code");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    joinClass();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getProfile();
    getAllSubjet();
    getAllAssignment();
    getAllNotes();
  }, [relodePage]);

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
                  className="rounded-full w-10 h-10 mx-auto"
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
            <div className="grid overflow-x-auto  grid-cols-4 gap-4 my-8">
              {subjects.length > 0 && (
                <>
                  {subjects?.map((subject, id) => {
                    return (
                      <>
                        <div>
                          <Link href={`assignment/${subject.id}`}>
                            <Card
                              img={images[id]}
                              name={subject?.subject_name}
                            />
                          </Link>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
            </div>
          </section>
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
            onChange={(e) => {
              setClassCode(e.target.value);
            }}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
