import { useEffect, useState } from "react";
import { getMonthlyBookingByYear } from "../../services/apiStatistics";
import { TagTitle } from "../../components/TagTitle";
import { SpaceArea } from "../../components/Space";
import type { DatePickerProps } from "antd";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Col, DatePicker, Row, Spin } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    // title: {
    //   display: true,
    //   text: "Line Chart",
    // },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "November",
];

export interface monthlyPlan {
  numsParty: number;
  parties: [];
  month: number;
}

export const MonthlyBooking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [monthlyData, setMonthlyData] = useState<monthlyPlan[]>();
  const [yearSlected, setYearSelected] = useState<string>("2024");

  useEffect(() => {
    async function getMonthly() {
      try {
        setLoading(true);
        const response = await getMonthlyBookingByYear(yearSlected);
        const sortByMonth = response.plan
          .sort((a, b) => a.month - b.month)
          .map((item) => item.numsParty);

        const final = {
          labels,
          datasets: [
            {
              label: "total booking by month",
              data: sortByMonth,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };

        setMonthlyData(final);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getMonthly();
  }, [yearSlected]);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setYearSelected(dateString[0]); // Fix: Access the first element of the dateString array
  };

  return (
    <SpaceArea>
      <Row justify="space-evenly">
        <Col span={12}>
          <TagTitle>Monthly Booking</TagTitle>
        </Col>
        <Col span={12}>
          <DatePicker onChange={onChange} picker="year" />
        </Col>
      </Row>
      {monthlyData && (
        <Spin spinning={loading}>
          <Line options={options} data={monthlyData} />
        </Spin>
      )}
    </SpaceArea>
  );
};
