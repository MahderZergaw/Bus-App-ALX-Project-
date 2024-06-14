import React, { useState, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const DriverDashboard = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passengers, setPassengers] = useState([]);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'onboarded', 'notOnboarded'
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [html5QrCode, setHtml5QrCode] = useState(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.error("No access token found");
        setLoading(false);
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const today = "2024-05-31";
      try {
        const response = await fetch(`http://localhost:8000/api/Bus/driver-schedules/${today}/`, { headers });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setSchedules(data);
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleViewPassengers = async (scheduleId) => {
    if (selectedScheduleId === scheduleId) {
      // Hide the passenger list if the same schedule is clicked again
      setSelectedScheduleId(null);
      setPassengers([]);
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("No access token found");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/Bus/view-passengers/${scheduleId}/`, { headers });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setPassengers(data);
      setSelectedScheduleId(scheduleId);
    } catch (error) {
      console.error("Failed to fetch passengers:", error);
    }
  };

  const handleRemovePassenger = async (passengerId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("No access token found");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await fetch(`http://localhost:8000/api/Bus/delete-booking/${passengerId}/`, {
        method: 'DELETE',
        headers,
      });
      if (response.status === 204) {
        // Remove the passenger from the state
        const updatedPassengers = passengers.filter((passenger) => passenger.id !== passengerId);
        setPassengers(updatedPassengers);
        alert("You have removed Passanger successfully");

        // Update the booked seats count in the corresponding schedule
        const updatedSchedules = schedules.map((schedule) => {
          if (schedule.id === selectedScheduleId) {
            return {
              ...schedule,
              num_booked_seats: schedule.num_booked_seats - 1,
            };
          }
          return schedule;
        });
        setSchedules(updatedSchedules);

        // Show success message
        setSuccessMessage('Passenger removed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000); // Hide the message after 3 seconds
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to remove passenger:", error);
    }
  };

  const handleScanId = async (scannedId) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error("No access token found");
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    const jsonString = '{' + scannedId.replace(/(\w+):/g, '"$1":').replace(/: ([\w-]+)/g, ': "$1"') + '}';

    // Parse the JSON string into a JavaScript object
    const jsonData = JSON.parse(jsonString);
    
    // Access the booking_id
    const bookingId = {
      "booking_id":jsonData.booking_id};
    
    console.log(bookingId);
    try {
      const response = await fetch(`http://localhost:8000/api/Bus/scan-passenger/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bookingId) 
        // + tryj
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      alert("It is Valid passenger");
      console.log("Scanned ID data:", data); // Process the scanned data as needed
    } catch (error) {
      console.error("Failed to scan ID:", error);
    }
  };

  useEffect(() => {
    let scanner;

    if (showQrScanner && !html5QrCode) {
      scanner = new Html5Qrcode("reader");
      setHtml5QrCode(scanner);

      scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,    // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
          console.log(`Scan result: ${decodedText}`, decodedResult);
          handleScanId(decodedText);
          // setShowQrScanner(false);
          // scanner.stop().then(() => {
            // scanner.clear();
            // setHtml5QrCode(null);
          // }).catch((err) => {
            // console.error("Failed to stop the scanner", err);
          // });
        },
        (errorMessage) => {
          // parse error, ignore it.
          console.warn(`QR Code no match: ${errorMessage}`);
        }
      ).catch((err) => {
        console.error(`Unable to start scanning, error: ${err}`);
      });
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().then(() => {
          html5QrCode.clear();
          setHtml5QrCode(null);
        }).catch((err) => {
          console.error("Failed to stop the scanner", err);
        });
      }
    };
  }, [showQrScanner, html5QrCode]);

  const filteredPassengers = passengers.filter(passenger => {
    if (filter === 'onboarded') return passenger.is_boarded;
    if (filter === 'notOnboarded') return !passenger.is_boarded;
    return true;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto mt-4">
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded">
          {successMessage}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-center">Today's Schedule</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-2 px-4 text-left">Departure Time</th>
              <th className="py-2 px-4 text-left">Arrival Time</th>
              <th className="py-2 px-4 text-left">Booked Seats</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2 px-4">{new Date(schedule.departure_time).toLocaleString()}</td>
                <td className="py-2 px-4">{new Date(schedule.arrival_time).toLocaleString()}</td>
                <td className="py-2 px-4">{schedule.num_booked_seats}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewPassengers(schedule.id)}
                  >
                    {selectedScheduleId === schedule.id ? 'Hide Passengers' : 'View Lists of Passengers'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedScheduleId && (
        <div className="mt-6">
          <div className="flex items-center mb-2">
            <h3 className="text-xl font-bold">Passengers for Schedule {selectedScheduleId}</h3>
            <button
              onClick={() => setShowQrScanner(true)}
              className="text-blue-500 hover:underline flex items-center ml-20"
            >
              <img src="../src/assets/qr_scanner_iconG.png" alt="Scan QR Code" className="w-6 h-6 mr-2" />
              Scan QR Code
            </button>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">Show:</span>
            <button
              className={`px-4 py-2 mr-2 ${filter === 'onboarded' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
              onClick={() => setFilter('onboarded')}
            >
              Onboarded
            </button>
            <button
              className={`px-4 py-2 mr-2 ${filter === 'notOnboarded' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
              onClick={() => setFilter('notOnboarded')}
            >
              Not Onboarded
            </button>
            <button
              className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
              onClick={() => setFilter('all')}
            >
              Show All
            </button>
          </div>
          {filteredPassengers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-3/5 bg-gray-800 text-white">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">User</th>
                    <th className="py-2 px-4 text-left">Seat Number</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPassengers.map((passenger) => (
                    <tr key={passenger.id} className="border-t border-gray-700">
                      <td className="py-2 px-4">{passenger.id}</td>
                      <td className="py-2 px-4">{passenger.user}</td>
                      <td className="py-2 px-4">{passenger.schedule_seat.seat.seat_number}</td>
                      <td className="py-2 px-4">
                        {filter === 'notOnboarded' && (
                          <button
                            className="text-red-500 hover:underline mr-4"
                            onClick={() => handleRemovePassenger(passenger.id)}
                          >
                            Remove from List
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No passengers found for this schedule.</p>
          )}
        </div>
      )}

      {showQrScanner && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <div id="reader" style={{ width: '300px', height: '300px' }}></div>
            {/* <button onClick={() => setShowQrScanner(false)} className="mt-4 px-4 py-2 bg-red-500 text-white"> */}
            <button onClick={() => {
              if (html5QrCode) {
                html5QrCode.stop().then(() => {
                  html5QrCode.clear();
                  setHtml5QrCode(null);
                }).catch((err) => {
                  console.error("Failed to stop the scanner", err);
                });
              }
              setShowQrScanner(false);
             }} className="mt-4 px-4 py-2 bg-red-500 text-white">
                       Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDashboard;