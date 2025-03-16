import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const ScheduleRide = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [scheduledTime, setScheduledTime] = useState(new Date());

  const handleScheduleRide = async () => {
    if (!pickup || !destination || !scheduledTime) {
      alert("Please fill all fields!");
      return;
    }

    try {
    //   const response = await axios.post("http://127.0.0.1:5000/schedule-ride", {
        const response = await axios.post("http://localhost:5000/schedule-ride", {

        pickup,
        destination,
        scheduled_time: scheduledTime.toISOString(),
      });

      alert(response.data.message);
    } catch (error) {
      alert("Failed to schedule ride. Try again.");
    }
  };

  return (
    <div className="container">
      <h2>Schedule a Ride</h2>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <DatePicker
        selected={scheduledTime}
        onChange={(date) => setScheduledTime(date)}
        showTimeSelect
        dateFormat="Pp"
      />
      <button onClick={handleScheduleRide}>Schedule Ride</button>
    </div>
  );
};

export default ScheduleRide;
