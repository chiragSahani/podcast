import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SecondNav from '../components/commonComponents/SecondNav';
import Subscription from '../components/Settings/Subscription';
import { BACKEND_URL } from '../config/constants';
import { config } from '../config/config';
import Loading from '../components/commonComponents/Loading'; 

const Settings = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingProfilePic, setLoadingProfilePic] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/user`, config);
        const userData = response.data.data;

        // Debugging: Log the user data
        console.log('Fetched user data:', userData);

        setProfilePic(userData.profilePic || null);
        setUsername(userData.userName || "");
        setEmail(userData.email || "");
        setLoadingProfilePic(false); // Stop loading once data is fetched
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINERY_UPLOAD_PRESET);

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINERY_UPLOAD_SECRET}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setProfilePic(data.secure_url);
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!username) {
      toast.error("Username cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = {
        profilePic,
        userName: username,
      };

      const response = await axios.put(`${BACKEND_URL}/api/user`, formData, config);

      if (response.status === 201) {
        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings. Please try again.");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6'>
      <SecondNav projectName={'Settings'} pageName={'Account Settings'} />
      <div className='my-8'>
        <h1 className='text-primary text-2xl font-roboto font-bold'>Account Settings</h1>
      </div>
      <div className='flex flex-col md:flex-row md:items-start gap-6'>
        {/* Profile Picture Section */}
        <div className='relative w-24 h-24 md:w-32 md:h-32'>
          <div className='w-full h-full rounded-full bg-gray-300 bg-cover bg-center'>
            {loadingProfilePic ? (
              <div className='flex items-center justify-center w-full h-full bg-gray-200 rounded-full'>
                < Loading /> 
              </div>
            ) : (
              <img
                src={profilePic || ''}
                alt="Profile"
                className='w-full h-full rounded-full object-cover'
                onLoad={() => setLoadingProfilePic(false)}
                onError={() => setLoadingProfilePic(false)} // Handle image load errors
              />
            )}
            <label className='absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer'>
              <FiUpload />
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className='hidden'
                disabled={isUploading}
              />
            </label>
          </div>
        </div>

        {/* Username and Email */}
        <div className='flex flex-col md:flex-row gap-4 w-full md:w-2/3'>
          <div className='flex flex-col w-full'>
            <label className='block text-sm font-semibold mb-1'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label className='block text-sm font-semibold mb-1'>Email</label>
            <input
              type='text'
              value={email}
              readOnly
              className='w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed'
            />
          </div>
        </div>

        {/* Save Button */}
        <div className='w-full md:w-1/4 mt-7'>
          <button
            onClick={handleSave}
            className='w-full py-2 px-4 bg-primary text-white font-semibold text-sm rounded hover:bg-primary-dark transition-colors'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Subscription Area */}
      <div className='mt-20'>
        <Subscription />
      </div>
    </div>
  );
};

export default Settings;
