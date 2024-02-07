import React, { useState } from "react";
import { useCsvFileReader } from "../hooks/useCsvFileReader";
import { Meteor } from "meteor/meteor";
import useAlertMessage from "../hooks/useAlertMessage";

export const UploadInput: React.FC = () => {
  const { handleFileSelect, processFile, setSelectedFile, selectedFile } = useCsvFileReader();
  const [inputKey, setInputKey] = useState(Date.now());
  const [message, setMessage, color] = useAlertMessage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage({ text: "Please upload a csv file", type: "error" });
      return;
    }
    const data = await processFile();
    console.log("data", data);
    Meteor.call("file.upload", JSON.stringify(data), (error: Meteor.Error | null) => {
      if (error) {
        setMessage({ text: `${error}`, type: "error" });
      } else {
        setSelectedFile(null);
        setInputKey(Date.now());
        setMessage({ text: `File uploaded successfully`, type: "success" });
      }
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setInputKey(Date.now());
  };

  const renderAlert = () => {
    return message ? (
      <div className={`${color} border px-4 py-3 rounded relative`} role="alert">
        <span className="block sm:inline">{message?.text}</span>
      </div>
    ) : null;
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Import fixture data</h1>

      <div className="w-full space-y-8 font-[sans-serif] mx-auto mt-3 max-w-md mb-28 shadow-lg p-10">
        <h1 className="text-xl text-center">Upload CSV</h1>
        <div className="flex items-center">
          <input
            key={inputKey}
            onChange={handleFileChange}
            accept=".csv"
            type="file"
            className="w-full text-black text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          />
          {selectedFile ? (
            <span className="pl-2 cursor-pointer" onClick={handleRemoveFile}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </span>
          ) : null}
        </div>
        {message && renderAlert()}
        <div className="text-center">
          <button
            className="bg-blue-800 hover:bg-blue-700 text-white py-2 px-4 rounded text-center"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </>
  );
};
