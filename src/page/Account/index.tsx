import { Space } from 'antd'
import React from 'react'
import { AccountTable } from './AccountTable'

export const Account: React.FC = () => {
  return (
    <div style={{ height: "10px" }}>
      <Space
        style={{
          background: "#ffff",
          padding: 10,
          borderRadius: 5,
          width: "100%",
        }}
      >
      </Space>
      <div style={{ marginTop: 10 }}>
        <AccountTable/>
      </div>
      {/* <ModalAdd open={open} setOpen={setOpen} /> */}
    </div>
  )
}
