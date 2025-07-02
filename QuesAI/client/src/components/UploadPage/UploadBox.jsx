import React from "react";
import { BsCloudUpload } from "react-icons/bs";

const UploadBox = () => {
  return (
    <div className="w-full border-dotted border-2 border-gray-500 rounded-lg h-auto">
      <div className="flex justify-center items-center md:my-5 my-2">
        <BsCloudUpload className="text-primary font-bold font-roboto text-5xl" />
      </div>
      {/* text section */}
      <div className="text-center">
        <p className="font-roboto text-black text-sm md:text-md ">
          {" "}
          Select a file or drag and drop here (Podcast Media or Transcription
          Text){" "}
        </p>
        <p className="text-gray-500 text-xs md:text-sm">
          MP4, MOV, MP3, WAV, PDF, DOCX or TXT file
        </p>
        <button className="border-primary border rounded-xl py-1 px-2 font-roboto font-semibold text-md text-primary my-4">
          {" "}
          Select File{" "}
        </button>
      </div>
    </div>
  );
};

export default UploadBox;
