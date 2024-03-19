import { Drawer } from "antd";

interface PartyDetailProps {
  open: boolean;
  setOpenDrawer: () => void;
}

export const PartyDetail: React.FC<PartyDetailProps> = ({
  open,
  setOpenDrawer,
}) => {
  return (
    <Drawer title="Party Detail" onClose={setOpenDrawer} open={open} size="large">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
