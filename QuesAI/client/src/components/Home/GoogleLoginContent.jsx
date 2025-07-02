import React, { useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { BACKEND_URL } from "../../config/constants";
import { config } from "../../config/config";
import { jwtDecode } from 'jwt-decode'
import toast from "react-hot-toast";

const GoogleLoginContent = ({ onClose, onAuthSuccess }) => {
  const { setIsAuthenticated } = useContext(AuthContext);


  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // Send the credential to your backend
      const USER_CREDENTIAL = jwtDecode(credentialResponse.credential );

      
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, {
        email: USER_CREDENTIAL?.email,
        userName : USER_CREDENTIAL?.name,
        profilePic : USER_CREDENTIAL?.picture
      } , config );

      if (response.data.success) {
          setIsAuthenticated(true);
        onAuthSuccess();

      } else {
        console.error("Login failed:", response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const handleLoginError = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in to Your Account</h2>
      <p className="text-gray-600 mb-8 text-center">
        Use your Google account to sign in quickly and securely.
      </p>
      <div className="flex justify-center mb-6">
        <GoogleLogin
          theme="filled_blue"
          size="large"
          shape="rectangular"
          text="continue_with"
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
      <p className="text-sm text-gray-500 text-center">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
      <button 
        onClick={onClose}
        className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Close
      </button>
    </div>
  );
};

export default GoogleLoginContent;