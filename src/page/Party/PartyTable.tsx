import React, { useState } from "react";
import { Space, Spin, Table, message, Popconfirm, Tooltip } from "antd";
import type { TableProps } from "antd";

import { Party } from "../../models/Party/Party";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { fixedNumber, formatDate, formatPrice } from "../../utils";
import { deleteParty } from "../../services/apiPatry";
import { PartyDetail } from "./PartyDetail";

interface PartyTableProps {
  parties: Party[];
  isloading: boolean;
  getAllParty: () => void;
}

const PartyUI: React.FC<PartyTableProps> = ({
  parties,
  isloading,
  getAllParty,
}) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const columns: TableProps<Party>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Tooltip placement="top" title="click to see detail">
          <a onClick={() => setOpenDrawer(!openDrawer)}>{text}</a>
        </Tooltip>
      ),
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
      render: (value) => {
        const convertedNum = +value;
        return fixedNumber(convertedNum)
      },
    },
    {
      title: "Max Customers",
      dataIndex: "maxCustomers",
      key: "maxCustomers",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        return formatDate(value)
      }
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (_, record: Party) => (
        <Space size="middle">
          <Popconfirm
            title="Delete Party"
            description="Are you sure to delete this party?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", opacity: 0.7 }} />
          </Popconfirm>
          <a>
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const confirm = async (party: Party) => {
    try {
      const response = await deleteParty(party.id);
      console.log(response);
      if (response.status === 204) {
        getAllParty();
        message.success("Delete success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Spin tip="Loading..." spinning={isloading}>
      <Table columns={columns} dataSource={parties} />
      <PartyDetail open={openDrawer} setOpenDrawer={onCloseDrawer} />
    </Spin>
  );
};

export default PartyUI;
