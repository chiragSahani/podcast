import React, { useState } from "react";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";
import Loading from "../../components/commonComponents/Loading";

const UploadInput = ({ onClose, onUpdate , icon ,text }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    else if (name.trim().length < 4) tempErrors.name = "Name must be at least 4 characters";
    if (!link.trim()) tempErrors.link = "Link/Description is required";
    else if (link.trim().length < 4) tempErrors.link = "Link/Description must be at least 4 characters";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validate()) {
      setIsLoading(true);
      onUpdate({ name: name.trim(), link: link.trim() });
      setTimeout(() => {
        setIsLoading(false);
        setName("");
        setLink("");
        onClose();
      }, 1000);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* <FaYoutube className="text-red-600 text-2xl mr-2" /> */}
          < img src={ icon } className="w-7 h-7" alt='icon' />
          <h2 className="text-xl font-bold">{ text }</h2>
        </div>
        <RiCloseLargeFill
          onClick={onClose}
          className="text-xl hover:cursor-pointer hover:scale-110 duration-700"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="link" className="block mb-2 font-bold">
          Link / Description
        </label>
        <textarea
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border rounded"
          rows="3"
        ></textarea>
        {errors.link && (
          <p className="text-red-500 text-sm mt-1">{errors.link}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UploadInput;