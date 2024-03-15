import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { Typography } from "antd";
import { getTopParty } from "../../services/apiStatistics";
import { formatDateToLocal } from "../../utils";
const { Option } = Select;
const { Title } = Typography;

interface TopParty {
  _id: string;
  name: string;
  price: number;
  rating: number;
  createdAt: string;
  numsParty: number;
}

const columns: TableProps<TopParty>["columns"] = [
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
  const [topHotparty, setTopHotParty] = useState<TopParty[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [topSelect, setTopSelect] = useState<string>("5");
  const [topInput, setTopInput] = useState("");

  const [form] = Form.useForm();

  useEffect(() => {
    async function getTopAll() {
      try {
        setLoading(true);
        const response = await getTopParty(topSelect);
        const topParty = response.topBookingParty.map(
          (party: TopParty, index: number) => {
            return {
              key: index + 1,
              name: party.name,
              price: party.price,
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
    <div
      style={{
        background: "#ffff",
        padding: 10,
        borderRadius: 5,
        width: "100%",
      }}
    >
      <Tag
        color="#87d068"
        style={{ marginBottom: 10, fontSize: 16, fontWeight: "bold", padding: '4px 8px'}}
      >
        Top party has the highest booking
      </Tag>
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
    </div>
  );
};
