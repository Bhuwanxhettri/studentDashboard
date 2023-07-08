import NavBar from "@/component/NavBar";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../api/axios";
import { message } from "antd";
import { FiLink, FiLock } from "react-icons/fi";
const Assignment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignments, setAssignments] = useState([]);
  const [meetingLink, setMeetingLink] = useState();
  const [notes, setNotes] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchAssignment = async () => {
    const res = await api.get(`/student/assignment/${id}`);
    if (res) {
      setAssignments(res.data);
    }
  };

  const meetingLinks = async () => {
    const res = await api.get(`/all/meetinglist/${id}`);
    if (res) {
      setMeetingLink(res.data);
    }

  }

  const fetchNotes = async () => {
    const res = await api.get(`/student/note/${id}`);
    if (res) {
      setNotes(res.data);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAssignment();
      fetchNotes();
      meetingLinks();
    }
  }, [id, refresh]);

  const AssignmentItem = ({ assignment }) => {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
      const formData = new FormData();
      formData.append("submission", file);
      const res = await api.post(
        `/student/assignment/${assignment.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        message.success("Assignment Uploaded Successfully");
        setRefresh(true);
      }
    };

    return (
      <div
        key={assignment.id}
        className="p-4 rounded-lg mb-4 bg-white shadow-md"
      >
        <div className="flex justify-between">
          <a href={assignment.pdf} target="_blank" rel="noopener noreferrer">
            <div className="relative w-48 h-48 cursor-pointer">
              <img
                src={assignment.pdf}
                alt={assignment.title}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-75 transition-opacity duration-300 bg-black bg-opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
          </a>
          <div className="ml-4">
            <h3 className="text-lg font-semibold mb-2">{assignment.title}</h3>
            <div
              className="px-6 text-gray-700"
              dangerouslySetInnerHTML={{ __html: assignment.word }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
          <label className="relative flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Selected file"
                className="mb-2 w-[200px] text-xs h-[200px]  object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
            <span className="mt-2 text-base leading-normal">
              {file ? file.name : "Select a file"}
            </span>
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            className="ml-4 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </button>
        </div>
        <div className="mt-4">
          <p className="text-gray-800 text-xs text-right">
            Due Date:{" "}
            {new Date(assignment.deadLine).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <div className="ml-56  px-5">
      <h4 className="text-xl py-5 font-sans font-bold text-[#094354]">
            Meeting Details
          </h4>
          <hr className="border-gray-400" />
        <div className="container h-[60vh] overflow-y-auto  mx-auto px-4 py-8">
          {meetingLink?.map((item, id) => {
            return <>
              <div key={item.id} className="bg-white rounded-lg  overflow-x-auto shadow-md p-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-bold mr-2">{item.title}</h2>
                </div>
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 font-bold mb-2">
                    <FiLink className="mr-2" />
                    Join URL:
                  </div>
                  <a target="_blank" href={item.joinUrl} className="text-blue-500 underline">
                    {item.joinUrl}
                  </a>
                </div>
                <div className="mb-6">
                  <div className="flex items-center text-gray-700 font-bold mb-2">
                    <FiLink className="mr-2" />
                    Start URL:
                  </div>
                  <a target="_blank" href={item.startUrl} className="text-blue-500 underline">
                    {item.startUrl}
                  </a>
                </div>
                <div>
                  <div className="flex items-center text-gray-700 font-bold mb-2">
                    <FiLock className="mr-2" />
                    Password:
                  </div>
                  <p className="text-gray-900">{item.password}</p>
                </div>
              </div>
            </>
          })}
        </div>

        <div className="">
          <h4 className="text-xl py-5 font-sans font-bold text-[#094354]">
            Assignment
          </h4>
          <hr className="border-gray-400" />
          <div className="h-[60vh] overflow-y-auto">
            {assignments.map((assignment) => (
              <AssignmentItem assignment={assignment} />
            ))}
          </div>
        </div>
        <div className="my-20">
          <h4 className="text-xl my-3 font-sans font-bold text-[#094354]">
            Notes For You
          </h4>
          <hr className="border-gray-400" />
          <div className="overflow-x-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
            {notes?.map((notesItem) => (
              <div
                key={notesItem.id}
                className="cursor-pointer rounded-xl  bg-white p-5"
              >
                <div className="flex items-center py-2 justify-between">
                  <div>
                    <h4 className="text-[#180909] font-bold">
                      {notesItem.title}
                    </h4>
                  </div>
                  <div>
                    <a href={notesItem.pdf} target="_blank">
                      <img
                        src={notesItem.pdf}
                        alt={notesItem.title}
                        className="w-auto h-auto rounded-md cursor-pointer mr-4"
                      />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
