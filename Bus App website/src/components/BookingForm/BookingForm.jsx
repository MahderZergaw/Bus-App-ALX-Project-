import React, { useState } from "react";
import axios from "axios";

const BookingForm = ({ onSearchBus }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      start_location: startLocation,
      destination: destination,
      time: dateTime,
    };

    axios.post("http://localhost:8000/api/Bus/available-buses/", bookingDetails, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        onSearchBus(response.data); // Pass data to parent component
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-gray-800 p-8 rounded shadow-lg text-white">
      <h2 className="text-2xl mb-4">Search for a Bus</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1">Start Location</label>
          <input
            type="text"
            placeholder="Enter starting point"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            className="p-2 rounded w-full text-black bg-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1">Destination</label>
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="p-2 rounded w-full text-black bg-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1">Date and Time</label>
          <input
            type="datetime-local"
            placeholder="Date and Time"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="p-2 rounded w-full text-black bg-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full mt-4"
        >
          Search Bus
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
