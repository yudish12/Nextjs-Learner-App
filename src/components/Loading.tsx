import React from "react";
import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Oval
        height={30}
        width={30}
        color="white"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="white"
        strokeWidth={5}
        strokeWidthSecondary={5}
      />
    </div>
  );
};

export default Loading;
