import { useState } from "react";
import "./Today.css";

// this component is used to get todays data so we can display it on the weather app
function Today() {
  // sets the useState to new Date() -> this function from javascript gives us todays date.
  const [currentDate] = useState(new Date());

  // we store all the days in arrays
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // we store all the months in arrays
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

  // we then use the days array we created to extract the exact day using the useState variable we created.
  const theDay = days[currentDate.getUTCDay()];
  // we then extract the date from the useState variable we created.
  const theDate = currentDate.getUTCDate();
  // we then use the months array we created to extract the exact month using the useState variable we created.
  const theMonth = months[currentDate.getUTCMonth()];
  // depending on the date we set a suffix for it
  const suffix =
    theDate === 1 || theDate === 21 || theDate === 31
      ? "st"
      : theDate === 2 || theDate === 22
      ? "nd"
      : theDate === 3 || theDate === 23
      ? "rd"
      : "th";

  // we return the date in the format we want it to display on our page
  return (
    <p className="currentDate">
      {theDay}, {theDate}
      <sup>{suffix}</sup> {theMonth}
    </p>
  );
}

export default Today;
