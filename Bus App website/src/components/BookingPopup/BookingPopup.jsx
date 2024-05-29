import React, { useState } from 'react';

const BookingPopup = ({ show, handleClose }) => {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Details:', { start, destination, time });
    handleClose(); // Close the popup after submission
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Book Your Ride</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="start" className="block text-gray-700">Start</label>
            <input
              type="text"
              id="start"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter start location"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="destination" className="block text-gray-700">Destination</label>
            <input
              type="text"
              id="destination"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="time" className="block text-gray-700">Time</label>
            <input
              type="text"
              id="time"
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPopup;
