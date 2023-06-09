import NavBar from "@/component/NavBar";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import api from "../api/axios";
const assignment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [assignments, setAssignments] = useState();
  const [notes, setNotes] = useState();

  const fetchAssignment = async () => {
    const res = await api.get(`/student/assignment/${id}`);
    if (res) {
      setAssignments(res.data);
    }
  };
  const fetchNotes = async () => {
    const res = await api.get(`/student/note/${id}`);
    if (res) {
      setNotes(res.data);
    }
  };
  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("submission", selectedFile);
    api
      .post(`/student/assignment/${id}`, formData)
      .then(() => {
        message.success("Assignment Uploaded Successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (id) {
      fetchAssignment();
      fetchNotes();
    }
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="ml-56  px-5">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <div className="h-[70vh] overflow-y-auto">
            {assignments?.map((assignment, index) => (
              <div
                key={assignment.id}
                className="flex   justify-between items-center bg-gray-100 p-4 rounded-lg mb-4"
              >
                <a href={assignment.pdf} target="_blank">
                  <img
                    src={assignment.pdf}
                    alt={assignment.title}
                    className="w-48 h-48 cursor-pointer  mr-4"
                  />
                </a>

                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    {assignment.title}
                  </h3>
                  <div
                    className="h-[40vh] overflow-y-scroll px-10 "
                    dangerouslySetInnerHTML={{ __html: assignment.word }}
                  />
                </div>
                <div>
                  <p className="text-gray-600 text-end ">
                    Due Date:{" "}
                    {new Date(assignment.deadLine).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex items-center justify-center">
                    <label className="relative">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                      />
                      <div className="bg-blue-500 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 inline-block mr-2"
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
                        Upload Assignment
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-5">
          <h4 className="text-xl my-3 font-sans font-bold text-[#094354]">
            Notes For you
          </h4>
          <hr></hr>
          <div className="overflow-x-auto grid grid-cols-4 gap-4 my-8">
            {notes?.map((notesItem) => {
              return (
                <>
                  <div className="cursor-pointer rounded-xl shadow-md bg-gradient-to-r  p-5">
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
                            className="w-auto h-auto rounded-md cursor-pointer  mr-4"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default assignment;
