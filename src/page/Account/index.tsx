import { Space } from 'antd'
import React from 'react'
import AccountTable from './AccountTable'

export const Account: React.FC = () => {
  return (
    <div style={{ height: "10px", width: 1400, margin: '0 auto' }}>
      <div style={{ marginTop: 10 }}>
        <AccountTable/>
      </div>
    </div>
  )
}
