import { useState, useEffect } from "react";

type AlertMessage = {
  text: string;
  type: "error" | "success" | "info";
};

const useAlertMessage = (initialMessage: AlertMessage | null = null, duration: number = 3000) => {
  const [message, setMessage] = useState<AlertMessage | null>(initialMessage);

  const getColor = (type: AlertMessage["type"] = "info"): string => {
    switch (type) {
      case "error":
        return "bg-red-100 border-red-400 text-red-700";
      case "success":
        return "bg-green-100 border-green-400 text-green-700";
      case "info":
        return "bg-blue-100 border-blue-400 text-blue-700";
      default:
        return "";
    }
  };

  const [color, setColor] = useState<string>(getColor(message?.type));
  useEffect(() => {
    if (message && message.text) {
      setColor(getColor(message.type));

      const timer = setTimeout(() => {
        setMessage(null);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  return [message, setMessage, color] as const;
};

export default useAlertMessage;
