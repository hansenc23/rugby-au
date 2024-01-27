import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FixturesList } from "../components/FixturesList";
export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
  }, [navigate]);
  return (
    <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-8">
      <FixturesList />
    </div>
  );
};
