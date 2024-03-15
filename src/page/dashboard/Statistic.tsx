import { Col, Row, Statistic, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getAllBookings, getAllRevanue } from "../../services/apiStatistics";
import { useDashBoard } from "../../context/dashboardContext";
import { PartySummary } from "./PartySummary";
import { Typography } from "antd";

const { Title } = Typography;

export const Stats = () => {
  const formatter = (value: number) => <CountUp end={value} separator="," />;
  const [loading, setIsloading] = useState<boolean>(false);
  const [totalRevanue, setTotalRevaue] = useState<number>(0);
  const [totalBooking, setTotalBooking] = useState<number>(0);
  const { date, dateRange } = useDashBoard();

  useEffect(() => {
    async function getAll() {
      try {
        setIsloading(true);
        const result = await getAllRevanue(date || dateRange);
        const bookings = await getAllBookings(date || dateRange);

        if (result.stats.length > 0) {
          setTotalRevaue(result.stats[0]?.totalRevanue);
        } else {
          setTotalRevaue(0);
        }
        if (bookings.stats.length > 0) {
          setTotalBooking(bookings.stats[0]?.totalOrders);
        } else {
          setTotalBooking(0);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getAll();
  }, [date, dateRange]);

  return (
    <Row>
      <Col span={10}>
        <Tag
          color="#87d068"
          style={{
            marginBottom: 10,
            fontSize: 16,
            fontWeight: "bold",
            padding: "4px 8px",
          }}
        >
          Summary
        </Tag>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title="Bookings"
              value={totalBooking}
              formatter={formatter}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Revanue"
              value={totalRevanue}
              precision={2}
              formatter={formatter}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={14}></Col>
    </Row>
  );
};
