import { DashboardProvider } from "../../context/dashboardContext";
import DateSelection from "./DateSelection";
import { Stats } from "./Statistic";

export const DashBoard = () => {
  return (
    <DashboardProvider>
      <DateSelection />
      <div style={{ marginTop: 50 }}>
        <Stats />
      </div>
    </DashboardProvider>
  );
};
