import { Col, Row, Statistic, Space } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getAllRevanue } from "../../services/apiStatistics";
import { useDashBoard } from "../../context/dashboardContext";

export const Stats = () => {
  const formatter = (value: number) => <CountUp end={value} separator="," />;
  const [loading, setIsloading] = useState<boolean>(false);
  const [totalRevalue, SetTotalRevaue] = useState<number>(0);
  const { date } = useDashBoard();

  useEffect(() => {
    async function getAll() {
      try {
        setIsloading(true);
        const result = await getAllRevanue(date);
        if (result?.length) {
            console.log(result)
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getAll();
  }, [date]);

  console.log('re-render', typeof date)
  return (
    <div style={{ height: "10px", textAlign: "center" }}>
      <Space
        style={{
          background: "#ffff",
          padding: 10,
          borderRadius: 5,
          width: "80%",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Bookings" value={112893} formatter={formatter} />
          </Col>
          <Col span={12}>
            <Statistic
              title="Revanue"
              value={112893}
              precision={2}
              //   formatter={formatter}
            />
          </Col>
        </Row>
      </Space>
      <div style={{ marginTop: 10 }}></div>
    </div>
  );
};
