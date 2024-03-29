import { Col, Row, Space } from "antd";
import { DashboardProvider } from "../../context/dashboardContext";
import DateSelection from "./DateSelection";
import { Stats } from "./Statistic";
import { UserStatistics } from "./UserStatistics";
import { PartySummary } from "./PartySummary";
import { TopParty } from "./TopParty";
import { MonthlyBooking } from "./MonthlyBooking";
import { SpaceArea } from "../../components/Space";

export const DashBoard = () => {
  return (
    <DashboardProvider>
      <DateSelection />
      <Row
        style={{
          marginTop: 50,
          width: "80%",
          margin: "50px auto",
        }}
        gutter={16}
      >
        <Col span={8}>
          <SpaceArea>
            <Stats />
          </SpaceArea>
        </Col>
        <Col span={8}>
          <SpaceArea>
            <PartySummary />
          </SpaceArea>
        </Col>
        <Col span={8}>
          <Space
            style={{
              background: "#ffff",
              padding: 10,
              borderRadius: 5,
              width: "100%",
            }}
          >
            <UserStatistics />
          </Space>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 50,
          width: "80%",
          margin: "50px auto",
        }}
        gutter={16}
      >
        <Col span={12}>
          <TopParty />
        </Col>
        <Col span={12}>
          <MonthlyBooking />
        </Col>
      </Row>
    </DashboardProvider>
  );
};
