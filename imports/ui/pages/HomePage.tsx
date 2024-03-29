import React from "react";
import { Link } from "react-router-dom";
export const HomePage = () => {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Rugby AU!</h1>
      <p className=" text-center py-5">
        See all fixtures{" "}
        <span className="text-blue-500">
          <Link to={"/fixtures"}>here</Link>
        </span>
      </p>
    </div>
  );
};
