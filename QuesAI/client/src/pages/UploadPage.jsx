import React, { useEffect, useState } from "react";
import SecondNav from "../components/commonComponents/SecondNav";
import UploadBox from "../components/UploadPage/UploadBox";
import DataTable from "../components/UploadPage/DataTable";
import ModalBox from "../components/commonComponents/ModalBox";
import UploadInput from "../components/UploadPage/UploadInput";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../config/constants";
import { useParams } from "react-router-dom";
import { config } from "../config/config";
import axios from "axios";

const UploadPage = () => {
  const { projectId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [projectName, setProjectName] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedText, setSelectedText] = useState(null);

  const handleDelete = (deleteId) => {
    setUploadedFiles((prevFiles) => prevFiles.filter(file => file._id !== deleteId));
  };

  //fetchUploaded files
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {

        const result = await axios.get(`${BACKEND_URL}/api/project/files/${projectId}`, config);
        const  resultData = await axios.get(`${BACKEND_URL}/api/project/${projectId}`, config);
        if( resultData?.data?.success ) {
            setProjectName( resultData?.data?.data?.projectName )
        }

        if (result?.data?.success) {
          const uploadedData = result?.data?.data;
          setUploadedFiles(uploadedData);
        } else {
          toast.error("Failed to load data. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        toast.error("Failed to load files. Please try again later!");
      }
    };

    fetchUploadedFiles();
  }, [isOpen]);

  const uploadMethods = [
    {
      platform: "youtube",
      icon: "https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Youtube_colored_svg-128.png",
      text: "Upload YouTube video",
    },
    {
      platform: "Spotify",
      icon: "https://cdn1.iconfinder.com/data/icons/social-media-brush-style/100/social_media_icon-25-64.png",
      text: "Upload Spotify podcast",
    },
    {
      platform: "Rss Feed",
      icon: "https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/rss-64.png",
      text: "Upload from RSS Feed",
    },
    // You can add more methods as needed
  ];

  // Handle update
  const handleUpdate = async (data) => {
    const { name, link } = data;
    const result = await axios.post(
      `${BACKEND_URL}/api/project/file/${projectId}`,
      { fileName: name, fileDescription: link },
      config
    );
    if (result?.data?.success) {
      toast.success("Upload success", 3000);
    } else {
      toast.error("Upload Failed! Try agin later");
    }
  };

  // Showing 3 methods if the data is there
  const displayMethods =
    uploadedFiles.length > 0 ? uploadMethods.slice(0, 3) : uploadMethods;

  const handleMethodClick = (icon, text) => {
    setSelectedIcon(icon);
    setSelectedText(text);
    setIsOpen(true);
  };

  return (
    <div className="w-full">
      {/* Nav */}
      <SecondNav projectName={ projectName } pageName={"Upload"} />
      {/* ModalBox */}
      <ModalBox isOpen={isOpen}>
        <UploadInput
          icon={selectedIcon}
          text={selectedText}
          onClose={() => setIsOpen(false)}
          onUpdate={(data) => handleUpdate(data)}
        />
      </ModalBox>
      {/* Main content */}
      <div className="w-full flex justify-start items-center ">
        <div className="w-11/12 mt-10 mb-10 ml-1">
          <h1 className="font-bold text-2xl font-roboto text-primary ">
            {uploadedFiles?.length < 1
              ? "Uploads"
              : `${ projectName ?? " Project"} `}
          </h1>

          <div className="py-5 mt-4 flex flex-wrap justify-between gap-2">
            {displayMethods && displayMethods.length > 0 ? (
              displayMethods.map((item, index) => (
                <div
                  onClick={() => handleMethodClick(item.icon, item.text)}
                  key={index}
                  className="border-2-black w-5/12  md:w-3/12 rounded-md h-auto mb-3 cursor-pointer"
                >
                  <div className="flex w-full justify-center items-center border border-black rounded-md">
                    <div className="w-8 md:w-12 m-2 rounded-full min-h-12">
                      <img
                        src={item.icon}
                        alt="Logo"
                        className="w-8 mx-2 my-3 object-fill "
                      />
                    </div>
                    <p className="font-roboto font-semibold text-sm md:text-sm ml-2 ">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>No Upload Methods Available</div>
            )}
          </div>

          {uploadedFiles.length === 0 ? (
            <div>
              {/* Upload section */}
              <div className="w-full text-gray-500 text-center mb-3">or</div>
              <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                <UploadBox />
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="w-full bg-primary rounded-md h-auto mb-4 flex justify-between items-center">
                <p className="text-white font-roboto px-6 ">
                  All files are processed! Your widget is ready to go!
                </p>
                <button className="bg-white py-2 px-3 rounded-md m-2 font-semibold text-sm">
                  Try it Out!
                </button>
              </div>
              {/* Uploaded items table */}
              <DataTable dataUploaded={uploadedFiles} onDelete={ (deleteId) => handleDelete(deleteId )} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
