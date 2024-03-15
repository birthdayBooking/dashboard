import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { getTopParty } from "../../services/apiStatistics";
import { formatDateToLocal, formatPrice } from "../../utils";
import { TagTitle } from "../../components/TagTitle";
import { SpaceArea } from "../../components/Space";
const { Option } = Select;

export interface TopPartyType {
  _id: string;
  name: string;
  price: number;
  rating: number;
  createdAt: string;
  numsParty: number;
}

const columns: TableProps<TopPartyType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Date created",
    key: "createdAt",
    dataIndex: "createdAt",
  },
  {
    title: "Number of Booking",
    key: "numsParty",
    dataIndex: "numsParty",
    render: (value: number, tag: string) => (
      <Tag color="#f50" key={tag}>
        {value}
      </Tag>
    ),
  },
];

export const TopParty = () => {
  const [topHotparty, setTopHotParty] = useState<TopPartyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [topSelect, setTopSelect] = useState<string>("5");

  const [form] = Form.useForm();

  useEffect(() => {
    async function getTopAll() {
      try {
        setLoading(true);
        const response = await getTopParty(topSelect);
        const topParty = response.topBookingParty.map(
          (party: TopPartyType, index: number) => {
            return {
              key: index + 1,
              name: party.name,
              price: formatPrice(party.price),
              rating: party.rating,
              createdAt: formatDateToLocal(party.createdAt),
              numsParty: party.numsParty,
            };
          }
        );

        setTopHotParty(topParty);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getTopAll();
  }, [topSelect]);

  const onReset = () => {
    form.resetFields();
  };

  return (
    <SpaceArea>
      <TagTitle>Top party has the highest booking</TagTitle>
      <div style={{ display: "flex", gap: 10 }}>
        <Form form={form}>
          <Form.Item label="Select top">
            <Space.Compact>
              <Form.Item name={["address", "province"]} noStyle>
                <Select
                  placeholder="Select Top Party"
                  onChange={(value) => setTopSelect(value)}
                  defaultValue={topSelect}
                >
                  <Option value="10">Top 10</Option>
                  <Option value="5">Top 5</Option>
                  <Option value="3">Top 3</Option>
                </Select>
              </Form.Item>
              <Form.Item name="top" noStyle>
                <Input
                  style={{
                    width: "50%",
                  }}
                  placeholder="input top"
                  onChange={(event) => {
                    setTopSelect(+event.target.value);
                  }}
                  onFocus={() => form.setFieldsValue({ topSelect: undefined })}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
        </Form>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={topHotparty}
          size="small"
          pagination={false}
        />
      </Spin>
    </SpaceArea>
  );
};
