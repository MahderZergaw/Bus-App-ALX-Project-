import React, { useState } from "react";
import BookingForm from "../BookingForm/BookingForm";
import BusTable from "../BusTable/BusTable";

const BookingPage = () => {
  const [buses, setBuses] = useState([]);

  const handleSearchBus = (data) => {
    setBuses(data);
  };

  return (
    <div className="container mx-auto p-4">
      <BookingForm onSearchBus={handleSearchBus} />
      {buses.length > 0 && <BusTable buses={buses} />}
    </div>
  );
};

export default BookingPage;
