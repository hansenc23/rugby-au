import React from "react";
import { FixturesList } from "../components/FixturesList";
import { UploadInput } from "../components/UploadInput";
import { AddFixtureForm } from "../components/AddFixtureForm";
export const ImportPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl p-2 sm:p-6 lg:p-8">
      <h1>Import Fixture data</h1>
      <UploadInput />
      <AddFixtureForm />
    </div>
  );
};
