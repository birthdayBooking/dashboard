import React, { useEffect, useState } from "react";
import { Space, Spin, Table } from "antd";
import type { TableProps } from "antd";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDateToLocal } from "../../utils";
import { getAllUsers } from "../../services/apiUser";
import { User } from "../../models/User/User";

const columns: TableProps<User>["columns"] = [
  {
    title: "User ID",
    dataIndex: "_id",
    key: "_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Full Name",
    dataIndex: "fullName",
    key: "fullName",
    render: (value: string) => {
      return value;
      return formatDateToLocal(value);
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    // render: (_, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //   </Space>
    // ),
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

interface ResponseUser {
  status: string;
  users: [];
}

const AccountTable: React.FC = () => {
  const [booking, setBooking] = useState<User[] | undefined>();
  const [isloading, setIsloading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllBooking() {
      try {
        setIsloading(true);
        const response: ResponseUser = await getAllUsers();
        console.log(response.users);
        if (response.users.length) {
          const userWithKey: User[] = response.users.map((user: User) => ({
            ...user,
            fullName: user.firstName + " " + user.lastName,
            key: user.id,
          }));
          setBooking(userWithKey);
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

export default AccountTable;
