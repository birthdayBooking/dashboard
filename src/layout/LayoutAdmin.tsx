import React, { useState } from "react";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import { menuItems } from "./sidebarMenu";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const LayoutAdmin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="1"
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
          onClick={() => {}}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              outline: "none",
            }}
          />
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          {/* <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          > */}
          <Outlet />
          {/* </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Birthdate Booking ©{new Date().getFullYear()} Created by FPT
          University
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
