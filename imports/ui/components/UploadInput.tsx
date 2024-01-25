import React, { useState } from "react";
import { useCsvFileReader } from "../hooks/useCsvFileReader";
import { Meteor } from "meteor/meteor";

export const UploadInput: React.FC = () => {
  const { handleFileSelect, parsedData, processFile } = useCsvFileReader();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const data = await processFile();
    Meteor.call("file.upload", JSON.stringify(data), (error: Meteor.Error | null, response: any) => {
      setIsLoading(false);
      if (error) {
        console.log(error);
      } else {
        console.log(response);
      }
    });
  };

  return (
    <div className="space-y-8 font-[sans-serif] max-w-md mx-auto">
      <input
        onChange={handleFileChange}
        accept=".csv"
        type="file"
        className="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};
