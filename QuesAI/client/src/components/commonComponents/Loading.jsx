import React from "react";
import "../../../public/loading.css";

const Loading = () => {
  return (
    <>
      {" "}
      <div className="w-full h-24 flex items-center justify-center">
        <section className="dots-container ">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      </div>
    </>
  );
};

export default Loading;
