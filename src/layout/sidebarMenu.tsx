import React from "react";
import {
  //   AppstoreOutlined   ,
  DesktopOutlined,
  CoffeeOutlined,
  TeamOutlined,
  PieChartOutlined,
  MessageOutlined 
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { AppRoutes } from "../constants/Routes";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem;
}

export const menuItems: MenuItem[] = [
  getItem(
    <Link to="/">Dashboard</Link>,
    `/`,
    <PieChartOutlined />
  ),
  {
    type: 'divider',
  },
  getItem(
    <Link to={AppRoutes.booking}>Booking</Link>,
    `/${AppRoutes.booking}`,
    <DesktopOutlined />
  ),
  getItem(
    <Link to={AppRoutes.user}>User Management</Link>,
    `/${AppRoutes.user}`,
    <TeamOutlined />
  ),
  getItem(
    <Link to={AppRoutes.party}>Party Management</Link>,
    `/${AppRoutes.party}`,
    <CoffeeOutlined />
  ),
  getItem(
    <Link to={AppRoutes.chat}>Chat Management</Link>,
    `/${AppRoutes.chat}`,
    <MessageOutlined />
  ),
];
