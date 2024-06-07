import React, { useState } from "react";
import axios from "axios";

const SeatMap = ({ seats, scheduleId }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  const handleBookNow = async () => {
    if (!selectedSeat) return;

    const token = localStorage.getItem('access_token');

    try {
      const response = await axios.post("http://localhost:8000/api/Bus/book-seat/", {
        schedule_id: scheduleId.id,
        seat_number: selectedSeat.seat.seat_number,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert("Seat booked successfully!");
        setBookingSuccess(true);
        setBookingDetails(response.data);
      } else {
        alert("Failed to book seat.");
      }
    } catch (error) {
      console.error("Error booking seat:", error);
      alert("An error occurred while booking the seat.");
    }
  };

  const getSeatData = (seatNumber) =>
    seats.find((seat) => seat.seat.seat_number === seatNumber.toString());

  return (
    <div className="mt-4 flex flex-col items-center">
      {!bookingSuccess ? (
        <>
          <div className="seat-map flex flex-col items-center">
            <h2 className="text-2xl mb-4">Seat Map</h2>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-40">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856C19.159 18.338 20 16.771 20 15c0-1.771-.841-3.338-2.07-4.268A8.938 8.938 0 0112 6c-2.343 0-4.468.9-6.07 2.732A6.982 6.982 0 004 15c0 1.771.841 3.338 2.07 4.268z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[
                1, 2, null, 3, 4, 5, 6, null, 7, 8, 9, 10, null, 11, 12, 13, 14, null,
                15, 16, 17, null, null, "Door",18, 19, null, 20, 21, 22, 23, null, 24,
                25, 29, 26, 27, 28, 30,
              ].map((seatNumber, index) => {
                if (seatNumber === null) {
                  return <div key={index} className="w-10 h-10"></div>;
                } else if (seatNumber === "Door") {
                  return (
                    <div
                      key={index}
                      className="col-span-2 w-20 h-10 flex items-center justify-center bg-gray-800 text-white font-bold"
                    >
                      Door
                    </div>
                  );
                } else {
                  const seatData = getSeatData(seatNumber);
                  return (
                    <button
                      key={index}
                      className={`w-10 h-10 flex items-center justify-center ${
                        seatData && seatData.is_available
                          ? "bg-green-500"
                          : "bg-gray-500"
                      } text-white font-bold`}
                      onClick={() => handleSeatClick(seatData)}
                      disabled={!seatData || !seatData.is_available}
                    >
                      {seatNumber}
                    </button>
                  );
                }
              })}
            </div>

            <div className="mt-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span>Available Seat</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-500 mr-2"></div>
                <span>Unavailable Seat</span>
              </div>
            </div>
          </div>

          <div className="seat-details flex flex-col items-center mt-4">
            {selectedSeat ? (
              <>
                <p>Seat Number: {selectedSeat.seat.seat_number}</p>
                <button
                  onClick={handleBookNow}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Book Now
                </button>
              </>
            ) : (
              <p>Select a seat to see details and book</p>
            )}
          </div>
        </>
      ) : (
        <div className="booking-details flex flex-col items-center">
          <h2 className="text-2xl mb-4">Booking Details</h2>
          <div className="details flex flex-col items-start mb-4">
            <p>You have successfully booked for Seat.</p>
            <p>Start Station: {bookingDetails.schedule.bus.start_location}</p>
            <p>Destination: {bookingDetails.schedule.bus.destination}</p>
            <p>Arrival Time: {bookingDetails.schedule.arrival_time}</p>
            <p>Plate Number: {bookingDetails.schedule.bus.platenumber}</p>
            <p>Price: {bookingDetails.schedule.bus.price}</p>
            <p>Seat Number: {bookingDetails.schedule_seat.seat.seat_number}</p>
          </div>
          <img src={`data:image/png;base64,${bookingDetails.qr_code}` }className="w-40; h-40" alt="QR Code" />
        </div>
      )}
    </div>
  );
};

export default SeatMap;
