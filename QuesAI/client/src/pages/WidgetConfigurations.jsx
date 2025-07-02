import React, { useState } from "react";
import axios from "axios";
import SecondNav from "../components/commonComponents/SecondNav";
import Loading from "../components/commonComponents/Loading";
import InputField from "../components/commonComponents/InputFiled";
import TabSwitch from "../components/commonComponents/TabSwitch";
import DisplaySettings from "../components/WidgetConfig/DisplaySettings";
import { BACKEND_URL } from "../config/constants";
import { config } from "../config/config";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const WidgetConfigurations = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [formData, setFormData] = useState({
    chatbotName: "",
    welcomeMessage: "",
    inputPlaceholder: "",
  });
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.length < 4) {
        newErrors[key] = "Minimum 4 characters required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const result = await axios.post(
        `${BACKEND_URL}/api/widget/display/${projectId}`,
        formData,
        config
      );
      if (result?.data?.success) {
        toast.success("Widget config saved successfully!");
      } else {
        toast.error("Widget config not saved successfully!");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Spinning overlay component
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <Loading />
      </div>
    </div>
  );

  return (
    <div>
      {isLoading && <LoadingOverlay />}
      {/* Navigation */}
      <SecondNav
        projectName={"Sample Project"}
        pageName={"Widget Configuration"}
      />
      {/* Header */}
      <div className="min-w-full">
        <h1 className="font-roboto font-bold text-2xl text-primary my-8">
          Configuration
        </h1>
      </div>

      {/* Tabs */}
      <TabSwitch
        tabs={["General", "Display", "Advanced"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Conditional rendering based on active tab */}
      {activeTab === "General" && (
        <form onSubmit={handleSubmit} className="mt-8">
          <InputField
            label="Chat bot Name"
            id="chatbotName"
            value={formData.chatbotName}
            onChange={handleInputChange}
            error={errors.chatbotName}
            helperText="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod et dolore magna aliqua."
          />
          <InputField
            label="Welcome Message"
            id="welcomeMessage"
            value={formData.welcomeMessage}
            onChange={handleInputChange}
            error={errors.welcomeMessage}
          />
          <InputField
            label="Input Placeholder"
            id="inputPlaceholder"
            value={formData.inputPlaceholder}
            onChange={handleInputChange}
            error={errors.inputPlaceholder}
          />
          <button
            type="submit"
            className="bg-primary text-white font-roboto font-semibold py-2 px-4 rounded"
            disabled={isLoading}
          >
            Submit
          </button>
        </form>
      )}

      {activeTab === "Display" && <DisplaySettings />}
      {activeTab === "Advanced" && (
        <h1 className="text-roboto text-primary">On Progress...</h1>
      )}
    </div>
  );
};

export default WidgetConfigurations;
