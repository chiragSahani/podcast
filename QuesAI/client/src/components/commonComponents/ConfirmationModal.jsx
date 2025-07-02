import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[400px] bg-white rounded-md p-4">
        <div className="text-right">
          <button onClick={onCancel}>
            <IoCloseCircleSharp className="text-2xl text-red-500" />
          </button>
        </div>
        <div className="text-center text-black">
          <p className="mb-4">{children}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="py-2 px-6 hover:scale-110 duration-500 bg-primary text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="py-2 px-6  hover:scale-110 duration-500 bg-gray-300 rounded"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
