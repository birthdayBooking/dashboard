import React, { useEffect, useState } from "react";
import { Space, Spin, Table } from "antd";
import type { TableProps } from "antd";

import { getAll } from "../../services/apiPatry";
import { Party } from "../../models/Party/Party";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatPrice } from "../../utils";

const columns: TableProps<Party>["columns"] = [
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
    render: (value) => {
      return formatPrice(value)
    }
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Max Customers",
    dataIndex: "maxCustomers",
    key: "maxCustomers",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
      </Space>
    ),
  },
  {
    title: "Action",
    key: "action",
    dataIndex: "action",
    render: () => (
      <Space size="middle">
        <a>
          <DeleteOutlined style={{ color: "red", opacity: 0.7 }} />
        </a>
        <a>
          <EditOutlined />
        </a>
      </Space>
    ),
  },
];

const PartyUI: React.FC = () => {
  const [parties, setParties] = useState<Party[] | undefined>();
  const [isloading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllParty() {
      try {
        setIsloading(true);
        const result = await getAll();
        if (result?.length) {
          const partiesWithKey = result.map((party) => ({
            ...party,
            key: party.id,
          }));
          setParties(partiesWithKey);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getAllParty();
  }, []);

  return (
    <Spin tip="Loading..." spinning={isloading}>
      <Table columns={columns} dataSource={parties} />
    </Spin>
  );
};

export default PartyUI;
