import React from "react";

const Subscription = () => {
  return (
    <div className="my-8">
      <h1 className="text-primary text-2xl font-roboto font-bol d">
        Subscriptions
      </h1>
      <div className="w-full bg-gradient-to-r from-[#7E22CE] to-[#460281] py-3 rounded-md mt-3 flex justify-between items-center px-10">
        <p className="text-white font-roboto">
          You are currently on the{" "}
          <span className="font-semibold underline">Ques AI Basic Plan!</span>
        </p>
        <button className="bg-white rounded-md px-3 py-2 text-primary font-roboto font-semibold">
          Upgrade
        </button>
      </div>

      <p className="text-red-600 font-roboto underline text-sm my-5 ">
        Cancel Subscription
      </p>
    </div>
  );
};

export default Subscription;
