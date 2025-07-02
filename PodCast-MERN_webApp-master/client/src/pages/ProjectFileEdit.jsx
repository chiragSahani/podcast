import React, { useState, useRef, useEffect } from "react";
import SecondNav from "../components/commonComponents/SecondNav";
import { IoSearchCircleOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../config/config";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config/constants";

const ProjectFileEdit = () => {
  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState('');
  const [file, setFile] = useState('');
  const [content, setContent] = useState("");
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();
  const contentEditableRef = useRef(null);
  const { projectId, fileId } = useParams();

  useEffect(() => {

    const fetchFile = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/api/project/file/${projectId}`, config);
        const resultData = await axios.get(`${BACKEND_URL}/api/project/${projectId}`, config);

        if (resultData?.data?.success) {
          setProject(resultData?.data?.data?.projectName);
        }

        if (result?.data?.success) {
          const uploadedFile = result?.data?.data;
          setFile(uploadedFile);
          setContent(uploadedFile?.fileDescription);
          setFileName(uploadedFile?.fileName);
        } else {
          toast.error("Failed to load data. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        toast.error("Failed to load files. Please try again later!");
      }
    };

    fetchFile();
  }, [projectId]);


  //handle submit 
  const handleUpdate = async () => {
    
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/project/${projectId}/file/${fileId}/update-transcript`,
        {
          fileName: fileName,
          fileDescription: content
        },
        config
      );
      
      if (response.status === 200) {
        toast.success('Transcript updated successfully');
        setTimeout(() => navigate(`/project/upload/${ projectId }`) , 1300 )
        setEditMode(false);
      } else {
        toast.error('Failed to update transcript');
      }
    } catch (error) {
      console.error('Error updating transcript:', error);
      toast.error('Error updating transcript');
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  return (
    <div className="w-full justify-center items-center">
      <SecondNav projectName={project} pageName={"Edit Transcript"} />
      <div className="w-11/12 my-8 ">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-bold font-roboto text-primary">
            Edit Transcript
          </h1>
          {editMode && (
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditMode(false);
                  setContent(file?.fileDescription);
                  setFileName(file?.fileName);
                }}
                className="border border-red-700 rounded-md py-1 px-4 text-red-700 font-roboto font-semibold"
              >
                Discard
              </button>
              <button
                onClick={handleUpdate}
                className="bg-gray-900 text-white py-1 px-4 rounded-md"
              >
                Save & exit
              </button>
            </div>
          )}
        </div>
        <div className="border border-primary rounded-md mt-5 max-h-[100%] h-auto font-roboto text-sm ">
          <div className="w-full flex justify-between items-center p-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-gray-700 duration-500 text-white px-3 flex justify-center items-center gap-2 py-1 rounded-xl text-sm hover:bg-gray-900 font-roboto"
            >
              <span>
                <MdOutlineEdit className="text-white" />
              </span>{" "}
              Edit Mode
            </button>
            <IoSearchCircleOutline className="text-2xl text-primary" />
          </div>
          {editMode ? (
            <div className="p-4">
              <input
                type="text"
                value={fileName}
                onChange={handleFileNameChange}
                className="w-full mb-4 p-2 border border-gray-300 rounded"
                placeholder="File Name"
              />
              <textarea
                ref={contentEditableRef}
                value={content}
                onChange={handleContentChange}
                className="w-full h-96 p-4 border border-dashed border-blue-500 resize-none"
              />
            </div>
          ) : (
            <div className="overflow-y-auto h-96 p-4">
              <h1 className="w-full text-primary text-lg pb-5 font-semibold font-roboto">{fileName}</h1>
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectFileEdit;