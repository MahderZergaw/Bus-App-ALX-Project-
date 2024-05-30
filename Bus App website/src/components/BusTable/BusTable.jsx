import React from "react";

const BusTable = ({ buses }) => {
  return (
    <div className="bg-gray-800 p-8 rounded shadow-lg text-white mt-4">
      <h2 className="text-2xl mb-4">Search Results</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Arrival Time</th>
            <th className="px-4 py-2">Plate Number</th>
            <th className="px-4 py-2">Seat</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">View Seat</th>
          </tr>
        </thead>
        <tbody>
          {buses.map((bus, index) => (
            <tr key={index} className="border-t border-gray-700">
              <td className="px-4 py-2">{bus.arrival_time}</td>
              <td className="px-4 py-2">{bus.plate_number}</td>
              <td className="px-4 py-2">{bus.seat}</td>
              <td className="px-4 py-2">{bus.price}</td>
              <td className="px-4 py-2">
                <button className="text-blue-500 hover:underline">View Seat</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusTable;
