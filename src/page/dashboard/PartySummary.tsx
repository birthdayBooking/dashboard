import { Col, Row, Statistic, Typography } from "antd";
import { useEffect, useState } from "react";
import { getPartyStatistics } from "../../services/apiStatistics";

const { Title } = Typography;

interface Party {
  numPartys: number;
  minPrice: number;
  maxPrice: number;
  avgRating: number;
  avgPrice: number;
}

export const PartySummary = () => {
  const [party, setParty] = useState<Party>();

  useEffect(() => {
    async function getAll() {
      try {
        const result = await getPartyStatistics();
        setParty(result.partyStats);
      } catch (error) {
        console.log(error);
      }
    }
    getAll();
  }, []);

  return (
    <>
      <Title level={3}>Party Summary</Title>
      <Row>
        <Col span={8}>
          <Col>
            <Statistic
              title="Total Party"
              value={party?.numPartys}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
          <Col>
            <Statistic
              title="Min Price"
              value={party?.minPrice}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
        </Col>

        <Col span={8}>
          <Col>
            <Statistic
              title="Average Price"
              value={party?.avgPrice}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
          <Col>
            <Statistic
              title="Max Price"
              value={party?.maxPrice}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
        </Col>

        <Col span={8}>
          <Col>
            <Statistic
              title="Average Rating"
              value={party?.avgRating}
              style={{ fontSize: "2.4rem", fontWeight: 500 }}
            />
          </Col>
        </Col>
      </Row>
    </>
  );
};
