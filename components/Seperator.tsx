import React from "react";

const Seperator = ({ label }) => {
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <div className="flex flex-1 h-[1px] bg-gray-200" />
      <p>{label}</p>
      <div className="flex flex-1 h-[1px] bg-gray-200" />
    </div>
  );
};

export default Seperator;
