import React from "react";

type paramTypes = {
  params: { id: string };
};

const Page = (params: paramTypes) => {
  return (
    <div className="flex justify-center mt-48 items-center">
      <span className="text-center border-white border-2 text-4xl p-3 text-white rounded-sm mx-auto w-1/2">
        This is profile page with id - {params.params.id}
      </span>
    </div>
  );
};

export default Page;
