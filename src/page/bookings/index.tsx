import { Button, Space } from 'antd'
import React from 'react'
import BookingTable from './BookingTable'

export const Bookings: React.FC = () => {
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
        <BookingTable/>
      </div>
      {/* <ModalAdd open={open} setOpen={setOpen} /> */}
    </div>
  )
}
