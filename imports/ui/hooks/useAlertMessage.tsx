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
        return "red";
      case "success":
        return "green";
      case "info":
        return "blue";
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
