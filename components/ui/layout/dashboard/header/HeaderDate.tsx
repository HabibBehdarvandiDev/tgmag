"use client";

import { useEffect, useState } from "react";
import moment from "jalali-moment";

const HeaderDate = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    // Function to update the current date and time
    const updateDateTime = () => {
      const now = moment(); // Use jalali-moment to get the current date and time
      const formattedDateTime = now.format("jYYYY/jMM/jDD"); // Format the date and time in Farsi
      setCurrentDateTime(formattedDateTime);
    };

    // Update the time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Initial update
    updateDateTime();

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-lg font-medium">{currentDateTime}</div>;
};

export default HeaderDate;
