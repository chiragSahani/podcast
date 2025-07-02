import React, { useState } from "react";
import Loading from "../commonComponents/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config/constants";
import { config } from "../../config/config";
import toast from "react-hot-toast";

const ModalContent = ({ onClose }) => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName.trim().length < 3) {
      setError("Project name must be at least 3 characters long");
      return;
    }
    
    setIsLoading(true);
    //function to post
    const result = await axios.post( `${ BACKEND_URL }/api/project/create`,{ projectName : projectName } ,config )
    if( result?.data?.success){
      toast.success( 'project created ' )
    }
    setTimeout(() => {
      setProjectName("");
      onClose();
    }, 1500);


    navigate("/projects");
  };

  const handleProjectNameChange = (e) => {
    const value = e.target.value;
    setProjectName(value);

    if (value.trim().length < 3) {
      setError("Project name must be at least 3 characters long");
    } else {
      setError("");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    // here we are controlling the modal content
    <div className="w-full px-5">
      <div className="w-full mb-5">
        <h1 className="font-roboto font-bold text-lg md:text-xl">
          {" "}
          Create New Project{" "}
        </h1>
      </div>
      {/* Project Name Input */}
      <form onSubmit={handleSubmit}>
        <div className="flex-col gap-4 mb-2">
          <label className="py-2 text-gray-700 text-sm " htmlFor="projectName">
            Enter Project Name:
          </label>
          <input
            type="text"
            value={projectName}
            placeholder="Type here "
            min={1}
            required
            onChange={handleProjectNameChange}
            className={`w-full p-2 mt-2 border rounded-lg ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* submit or cancel div */}
        <div className="flex justify-end  gap-3 font-semibold my-5">
          <button
            className="text-red-500"
            onClick={() => {
              onClose();
            }}
          >
            {" "}
            Cancel{" "}
          </button>
          <button
            className="bg-primary rounded-md px-2 text-white py-2 hover:bg-purple-800"
            type="submit"
          >
            {" "}
            Create{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalContent;
