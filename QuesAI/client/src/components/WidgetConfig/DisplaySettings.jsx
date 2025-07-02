import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import {config} from '../../config/config'
import { BACKEND_URL } from '../../config/constants'
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const DisplaySettings = () => {
  const { projectId } = useParams()
  const [fontSize, setFontSize] = useState("");
  const [chatHeight, setChatHeight] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [fontColor, setFontColor] = useState("#000000");
  const [showSources, setShowSources] = useState(false);
  const [chatIconSize, setChatIconSize] = useState("small");
  const [screenPosition, setScreenPosition] = useState("bottom-right");
  const [distanceFromBottom, setDistanceFromBottom] = useState("");
  const [horizontalDistance, setHorizontalDistance] = useState("");
  const [botIcon, setBotIcon] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);


  //handling imageuplaod 
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
        setBotIcon(data.secure_url); 
        toast.success("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !fontSize ||
      !chatHeight ||
      !primaryColor ||
      !fontColor ||
      !chatIconSize ||
      !screenPosition ||
      !distanceFromBottom ||
      !horizontalDistance
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (chatHeight < 1 || chatHeight > 100) {
      toast.error("Chat height must be between 1 and 100.");
      return;
    }

    setIsSubmitting(true);

    const formData = {
      fontSize,
      chatHeight,
      primaryColor,
      fontColor,
      showSources,
      chatIconSize,
      screenPosition,
      distanceFromBottom,
      horizontalDistance,
      botIcon,
    };
    try {
      const result = await axios.post(`${ BACKEND_URL }/api/widget/display/${projectId}`, formData , config);
      if (result?.data?.success) {
        toast.success("widget config saved successfully!");
      } else {
        toast.error("widget config not saved successfully!");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
      {/* Primary Color and Font Color */}
      <div className="w-full md:w-5/12 flex items-center text-sm">
        <label className="block font-roboto font-semibold w-1/3">
          Primary Color
        </label>
        <div className="w-full items-center">
          <input
            required
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-2/3 p-2 mt-2 border border-gray-300 rounded"
          />
          <p className="text-xs text-gray-500">Lorem ipsum dolor erit.</p>
        </div>
        <input
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className="w-10 h-10 ml-4 rounded cursor-pointer"
          style={{ padding: 0, border: "none" }}
        />
      </div>

      {/* Font Color */}
      <div className="w-full md:w-5/12 flex text-sm items-center">
        <label className="block font-roboto font-semibold w-1/3">
          Font Color
        </label>
        <div>
          <input
            required
            type="text"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            className="w-2/3 p-2 mt-2 border border-gray-300 rounded"
          />
          <p className="text-xs text-gray-500">Lorem ipsum dolor erit.</p>
        </div>
        <input
          type="color"
          required
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
          className="w-10 h-10 ml-4 rounded cursor-pointer"
          style={{ padding: 0, border: "none" }}
        />
      </div>

      {/* Font Size and Chat Height */}
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-sm">
          Font Size (px)
        </label>
        <input
          type="number"
          min="1"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-black text-sm">
          Chat Height (% of Total Screen)
        </label>
        <input
          required
          type="number"
          value={chatHeight}
          onChange={(e) => setChatHeight(e.target.value)}
          min="1"
          max="100"
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>

      {/* Show Sources Toggle */}
      <div className="w-full md:w-11/12 mr-24 flex items-center justify-between">
        {/* Label on the left side */}
        <label className="block font-roboto font-semibold text-black">
          Show Sources
          <p className="text-xs text-gray-500">Lorem ipsum dolor sit am. Distinctio maiores alias inventore debitis odio nihil qui, cupiditate blanditiis .</p>
        </label>

        {/* Toggle switch on the right side */}
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showSources}
            onChange={(e) => setShowSources(e.target.checked)}
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Divider */}
      <div className="w-full border-t-2 border-gray-300 my-4"></div>
      <div className="w-full text-lg text-primary font-roboto font-semibold">
        Chat Icon
      </div>

      {/* Chat Icon Size and Screen Position */}
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-black text-sn">
          Chat Icon Size
        </label>
        <select
          required
          value={chatIconSize}
          onChange={(e) => setChatIconSize(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        >
          <option value="small">Small (48x48 px)</option>
          <option value="medium">Medium (64x64 px)</option>
          <option value="large">Large (80x80 px)</option>
        </select>
      </div>
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-black text-sm">
          Position on Screen
        </label>
        <select
          required
          value={screenPosition}
          onChange={(e) => setScreenPosition(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        >
          <option value="bottom-right">Bottom Right</option>
          <option value="bottom-left">Bottom Left</option>
          <option value="top-right">Top Right</option>
          <option value="top-left">Top Left</option>
        </select>
      </div>

      {/* Distance from Bottom and Horizontal Distance */}
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-sm">
          Distance from Bottom (px)
        </label>
        <input
          min={1}
          required
          type="number"
          value={distanceFromBottom}
          onChange={(e) => setDistanceFromBottom(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-sm">
          Horizontal Distance (px)
        </label>
        <input
          type="number"
          required
          min={1}
          value={horizontalDistance}
          onChange={(e) => setHorizontalDistance(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        />
      </div>

      {/* Bot Icon Upload */}
      <div className="w-full md:w-5/12">
        <label className="block font-roboto font-semibold text-sm">
          Bot Icon
        </label>
        <div className="flex items-center gap-4 mt-2">
          {/* Rounded div for the bot icon */}
          <div
            className="w-12 h-12 rounded-full bg-gray-300 bg-cover bg-center"
            style={{ backgroundImage: botIcon ? `url(${botIcon})` : "none" }}
          ></div>
          {/* Upload button */}
          <label className="bg-primary text-white font-semibold py-2 px-4 rounded cursor-pointer flex items-center gap-2">
            {isUploading ? "Loading..." : " Upload Image"} <FiUpload />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-3/12 mt-6 py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition-colors"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
};

export default DisplaySettings;
