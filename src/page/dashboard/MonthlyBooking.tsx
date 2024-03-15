import React, { useEffect, useState } from "react";
import { getMonthlyBookingByYear } from "../../services/apiStatistics";
import { TagTitle } from "../../components/TagTitle";
import { SpaceArea } from "../../components/Space";

export const MonthlyBooking = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getMonthly() {
      try {
        setLoading(true);
        const response = await getMonthlyBookingByYear("2024");
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getMonthly();
  }, []);

  return (
    <SpaceArea>
      <TagTitle>Monthly Booking</TagTitle>
    </SpaceArea>
  );
};
