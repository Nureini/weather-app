import { useState } from "react";
import "./CalorieTracker.css";
import CloseIcon from "@mui/icons-material/Close";

// gets props setIsMenuClicked and setIsProfileClicked function
const CalorieTracker = ({ setIsMenuClicked, setIsCalorieTrackerClicked }) => {
  const [minutes, setMinutes] = useState("");
  const [weight, setWeight] = useState("");
  const [caloriesBurn, setCaloriesBurn] = useState(0);

  // calculate burned calories, params time -> time: spent cycling in mintues and bodyWeight: the users body weight in KG
  const calculateBurnedCalories = (time, bodyWeight) => {
    const timeToHours = time / 60;
    // 8 -> is the value reffered to as MET which stands for metabolic equivalent of task, a measure of the intensity of the activity -> for cycling this is usually 8 for moderate cycling.
    // we also divide time by 60 to convert it to hours
    const burnedCalories = 8 * bodyWeight * timeToHours;
    return burnedCalories;
  };

  // when button is clicked this function calculates calories burned with the values user provides.
  const handleBtn = (e) => {
    e.preventDefault();
    let caloriesBurned = calculateBurnedCalories(minutes, weight);
    // we set the state value of the variable to the calcualed value.
    setCaloriesBurn(caloriesBurned);
  };

  return (
    <div className="calorieTracker">
      <CloseIcon
        className="calorieTracker__closeIcon"
        onClick={() => {
          setIsCalorieTrackerClicked(false);
          setIsMenuClicked(true);
        }}
        fontSize="large"
      />
      <h1>Calorie Tracker</h1>
      <p>Track how many calories burned from moderate cycling</p>
      <form>
        <div className="input--containers">
          <label htmlFor="minutes">Enter time spent cycling in minutes</label>
          <input
            type="text"
            name="minutes"
            id="minutes"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>

        <div className="input--containers">
          <label htmlFor="minutes">Enter your body weight in kg</label>
          <input
            type="text"
            name="weight"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <button className="button" onClick={handleBtn}>
          Submit
        </button>
      </form>
      <div>
        <h3>You have burnt approximately</h3>
        {/* We round calories burned to a whole number */}
        <p className="calories">{Math.round(caloriesBurn)} calories</p>
      </div>
    </div>
  );
};
export default CalorieTracker;
