import React from "react";
import AddIcon from '../../assets/Home/AddIcon.png'

const CreateButton = ({ clickFunction }) => {
  

  return (
    <button
      onClick={clickFunction}
      className="flex items-center justify-center gap-3 bg-createButton text-white px-3 py-2 rounded-md hover:scale-x-95 duration-500"
    >
      {" "}
      <img src={AddIcon} alt="addIcon" title="create" className="w-4" /> Create
      New Project{" "}
    </button>
  );
};

export default CreateButton;
