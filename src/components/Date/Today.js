import { useState, useEffect } from "react";
import "./Today.css";

function Today() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const theDay = days[currentDate.getUTCDay()];
  const theDate = currentDate.getUTCDate();
  const theMonth = months[currentDate.getUTCMonth()];
  const suffix =
    theDate === 1 || theDate === 21 || theDate === 31
      ? "st"
      : theDate === 2 || theDate === 22
      ? "nd"
      : theDate === 3 || theDate === 23
      ? "rd"
      : "th";

  return (
    <p className="currentDate">
      {theDay}, {theDate}
      <sup>{suffix}</sup> {theMonth}
    </p>
  );
}

export default Today;
