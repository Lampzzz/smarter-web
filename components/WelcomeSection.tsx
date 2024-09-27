import logo from "@/assets/images/logo.png";

import React from "react";

const WelcomeSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <img src={logo} alt="SmarTer" className="w-24 h-24 mb-4" />
      <h2 className="text-2xl font-bold mb-2">
        Welcome to <span className="text-orange-500">SmarTer</span>
      </h2>
      <p className="text-gray-700">
        A smart shelter with reliable power, environmental monitoring, and
        secure emergency connectivity.
      </p>
    </div>
  );
};

export default WelcomeSection;
