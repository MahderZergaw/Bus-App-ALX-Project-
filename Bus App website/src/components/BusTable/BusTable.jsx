import React, { useState } from "react";
import SeatMap from "../SeatMap/SeatMap";

const BusTable = ({ buses }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [seats, setSeats] = useState([]);

  const handleViewSeat = async (scheduleId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/Bus/schedule/${scheduleId}/seats`);
      const data = await response.json();
      setSeats(data.schedule_seats);
      setSelectedSchedule({
        id: data.id,
        departure_time: data.departure_time,
        arrival_time: data.arrival_time,
      });
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  };

  return (
    <div className="overflow-x-auto mt-9">
      <h2 className="text-2xl mb-4">Search Result</h2>
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4">Plate Number</th>
            <th className="py-2 px-4">Start Location</th>
            <th className="py-2 px-4">Destination</th>
            <th className="py-2 px-4">Departure Time</th>
            <th className="py-2 px-4">Arrival Time</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Available Seat</th>
            <th className="py-2 px-4">View Seat</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus) => (
            bus.schedules.map((schedule) => (
              <tr key={schedule.id}>
                <td className="py-2 px-4">{bus.platenumber}</td>
                <td className="py-2 px-4">{bus.start_location}</td>
                <td className="py-2 px-4">{bus.destination}</td>
                <td className="py-2 px-4">{new Date(schedule.departure_time).toLocaleString()}</td>
                <td className="py-2 px-4">{new Date(schedule.arrival_time).toLocaleString()}</td>
                <td className="py-2 px-4">{bus.price} birr</td>
                <td className="py-2 px-4">{schedule.available_seats}/30 Seats</td>
                <td className="py-2 px-4">
                  {/* <button className="text-blue-500 hover:underline" onClick={() => handleViewSeat(schedule.id)}>View Seat</button> */}
                  <button className="text-blue-500 hover:underline" onClick={() => handleViewSeat(7)}>View Seat</button>

                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
      {selectedSchedule && <SeatMap seats={seats}  scheduleId={selectedSchedule}/>}
    </div>
  );
};

export default BusTable;
