import { Col, Row, Statistic, Space } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getAllRevanue } from "../../services/apiStatistics";
import { useDashBoard } from "../../context/dashboardContext";

export const Stats = () => {
  const formatter = (value: number) => <CountUp end={value} separator="," />;
  const [loading, setIsloading] = useState<boolean>(false);
  const [totalRevalue, SetTotalRevaue] = useState<number>(0);
  const { date, dateRange } = useDashBoard();

  useEffect(() => {
    async function getAll() {
      console.log('date', date)
      try {
        setIsloading(true);
        const result = await getAllRevanue(date || dateRange); 
        console.log("total:", result);
        if (!result.stats[0].totalRevanue) {
          SetTotalRevaue(0);
        }
        SetTotalRevaue(result.stats[0]?.totalRevanue);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getAll();
  }, [date, dateRange]);

  //console.log("totalRevalue", totalRevalue);
  // console.log(dateRange)
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
              value={totalRevalue}
              precision={2}
              formatter={formatter}
            />
          </Col>
        </Row>
      </Space>
      <div style={{ marginTop: 10 }}></div>
    </div>
  );
};
