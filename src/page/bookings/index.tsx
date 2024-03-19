import React from "react";
import BookingTable from "./BookingTable";

export const Bookings: React.FC = () => {
  return (
    <div style={{ marginTop: 10, width: 1400, margin: '0 auto' }}>
      <BookingTable />
    </div>
  );
};
