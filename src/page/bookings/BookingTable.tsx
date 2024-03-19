import React, { useEffect, useState } from "react";
import { Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getAll } from "../../services/apiBooking";
import { Booking } from "../../models/Booking/Booking";
import { formatDate, formatDateToLocal, formatPrice } from "../../utils";

const columns: TableProps<Booking>["columns"] = [
  {
    title: "Booking ID",
    dataIndex: "_id",
    key: "_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Customer ID",
    dataIndex: "customerId",
    key: "customerId",
    render: (value: string) => {
      return value;
    },
  },
  {
    title: "Date Booking",
    dataIndex: "orderDate",
    key: "orderDate",
    render: (value) => {
      return formatDate(value);
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: string) => (
      <Tag color={value === 'pending' ? 'red' : 'green'} key={value}>
        {value.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: "Amount",
    key: "total",
    dataIndex: "total",
    render: (value: number) => {
      return formatPrice(value);
    },
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

const BookingTable: React.FC = () => {
  const [booking, setBooking] = useState<Booking[] | undefined>();
  const [isloading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllBooking() {
      try {
        setIsloading(true);
        const result = await getAll();
        if (result?.length) {
          const partiesWithKey: Booking[] = result.map((booking: Booking) => ({
            ...booking,
            key: booking.id,
          }));
          setBooking(partiesWithKey);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }
    getAllBooking();
  }, []);

  return (
    <Spin tip="Loading..." spinning={isloading}>
      <Table columns={columns} dataSource={booking} />
    </Spin>
  );
};

export default BookingTable;
