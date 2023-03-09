import React from "react";

const AdditionalData = ({item,value}) => {
  return (
    <div className="flex border border-zinc-200 p-1 px-2 rounded-full">
      <p>{item}: {value}</p>
    </div>
  );
};

export default AdditionalData;
