import React from "react";
import { Link } from "react-router-dom";
export const NotFoundPage = () => {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-center">Oops page not found!</h1>
      <p className=" text-center py-5">
        Click{" "}
        <span className="text-blue-500">
          <Link to={"/"}>here</Link>
        </span>{" "}
        to go home
      </p>
    </div>
  );
};
