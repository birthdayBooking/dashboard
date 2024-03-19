import { Col, Row, Skeleton, Spin, Statistic, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
import { getPartyStatistics } from "../../services/apiStatistics";
import { LoadingOutlined } from "@ant-design/icons";
import { TagTitle } from "../../components/TagTitle";
import { fixedNumber } from "../../utils";

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
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAll() {
      try {
        setLoading(true);
        const result = await getPartyStatistics();
        setParty(result.partyStats);
      } catch (error) {
        console.log(error);
      } finally {
        setActive(false);
        setLoading(false);
      }
    }
    getAll();
  }, []);

  return (
    <>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
        spinning={loading}
      >
        <TagTitle>Party Summary</TagTitle>
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
                value={fixedNumber(+party?.avgRating)}
                style={{ fontSize: "2.4rem", fontWeight: 500 }}
              />
            </Col>
          </Col>
        </Row>
      </Spin>
    </>
  );
};
