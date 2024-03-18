import React, { useEffect, useState } from "react";
import { Space, Spin, Table } from "antd";
import type { TableProps } from "antd";

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
      return formatPrice(value);
    },
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

interface PartyTableProps {
  parties: Party[];
  isloading: boolean;
}

const PartyUI: React.FC<PartyTableProps> = ({ parties, isloading }) => {
  return (
    <Spin tip="Loading..." spinning={isloading}>
      <Table columns={columns} dataSource={parties} />
    </Spin>
  );
};

export default PartyUI;
