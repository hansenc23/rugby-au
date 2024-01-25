import { useState } from "react";
import Papa from "papaparse";

export const useCsvFileReader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const processFile = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      if (selectedFile && selectedFile.type === "text/csv") {
        Papa.parse(selectedFile, {
          complete: (result) => {
            setParsedData(result.data);
            resolve(result.data);
          },
          header: true,
          error: (error) => reject(error),
        });
      } else {
        alert("Please upload a CSV file.");
        reject(new Error("Invalid file type"));
      }
    });
  };

  return { parsedData, handleFileSelect, processFile };
};
