import React, { useContext, useState, useEffect } from "react";
import MainBanner from "../components/Home/MainBanner.jsx";
import TextArea from "../components/Home/TextArea.jsx";
import CreateButton from "../components/Home/CreateButton.jsx";
import ModalBox from "../components/commonComponents/ModalBox.jsx";
import ModalContent from "../components/Home/ModalContent.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import GoogleLoginContent from "../components/Home/GoogleLoginContent.jsx";
import Loading from "../components/commonComponents/Loading.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/constants.js";
import { config } from "../config/config.js";
import toast from "react-hot-toast";


const Home = () => {
  const { isAuthenticated, setIsAuthenticated, isLoading } =
    useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const navigate  = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await axios.get(`${BACKEND_URL}/api/project`, config);

        if (result?.data?.success) {
          const projectData = result?.data?.data;
          setProjects(projectData);
        } else {
          toast.error("Failed to load projects. Please try again later!");
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // toast.error("Failed to load projects. Please try again later!");
      }
    };

    fetchProjects();
  }, []);

  // Project Details Modal Opening phase
  function handleCreateModal() {
    if (isAuthenticated) {
      setIsOpen(true);
    } else {
      setShowAuthModal(true);
    }
  }

  // Function for closing modal
  function handleModalClose() {
    setIsOpen(false);
  }

  // Function for closing auth modal
  function handleAuthModalClose() {
    setShowAuthModal(false);
  }

  // Function to handle successful authentication
  function handleAuthSuccess() {
    setIsAuthenticated(true);
    setShowAuthModal(false);
  }

  // Text content
  let textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in";

  return (
    <>
      {/*  */}
      {isLoading && (
        <div className="fixed rounded-md inset-0 bg-black bg-opacity-30  backdrop-blur-sm flex justify-center items-center ">
          <div className="w-[600px]  bg-white rounded-md p-2 ">
            <div className="bg-white p-2 text-black">
              <Loading />{" "}
            </div>
          </div>
        </div>
      )}
      {/*  */}
      <div className="flex justify-center items-center w-full min-h-screen overflow-y-hidden fixed">
        <div className="w-9/12 min-h-[80vh] mb-28">
          {/* Heading [title] */}
          <div className="w-full h-auto">
            <h1 className="font-bold text-center m-8 font-roboto text-4xl text-primary">
              Create a New Project
            </h1>
            {/* Banner */}
            <div className="flex justify-center">
              <MainBanner />
            </div>
            {/* Text Area */}
            <div className="flex justify-center items-center md:pt-9 pb-6 md:px-24">
              <TextArea content={textContent} />
            </div>
            {/* Button Sec */}
            <div className="flex justify-center items-start font-roboto">
              <CreateButton clickFunction={handleCreateModal} />
              { projects?.length > 0 && (
                <button
                  className="bg-primary text-white px-5 py-2 rounded-md mx-3 hover:scale-105 duration-500 font-roboto "
                  onClick={() => navigate("/projects ")}
                >
                  {" "}
                  Show Projects{" "}
                </button>
              )}
              {isOpen && (
                <ModalBox isOpen={isOpen}>
                  <ModalContent onClose={handleModalClose} />
                </ModalBox>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {!isAuthenticated && (
        <ModalBox isOpen={showAuthModal}>
          <GoogleLoginContent
            onClose={handleAuthModalClose}
            onAuthSuccess={handleAuthSuccess}
          />
        </ModalBox>
      )}
    </>
  );
};

export default Home;
