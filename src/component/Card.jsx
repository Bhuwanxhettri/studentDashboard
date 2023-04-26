import React from "react";

const Card = ({ img, name, subCode }) => {
  return (
    <div>
      <div className="flex justify-center cursor-pointer hover:scale-110 transform transition duration-500">
        <div className="block max-w-sm rounded-lg bg-white hover:shadow-orange-50 shadow-md dark:bg-neutral-700">
          <span>
            <img className="rounded-t-lg h-40 w-64" src={img} alt="" />
          </span>
          <div className="p-3">
            <p className="mb-1 font-bold text-md  leading-tight text-neutral-800 dark:text-neutral-50">
              {name}
            </p>
            <p className="text-sm inline-block">{subCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
