import { createContext, useContext, useState } from "react";
import moment from "moment";

type DateChangeHandler = (date: moment.Moment | null, dateString: string) => void;
type DateRangeChangeHandler = ( dates: [moment.Moment | null, moment.Moment | null], dateStrings: [string, string] ) => void;

type DashboardContextType = {
  getDate: DateChangeHandler;
  getDateRange: DateRangeChangeHandler;
  date: string;
  dateRange: [string, string]
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [date, setDate] = useState<string>();
  const [dateRange, setDateRange] = useState<[string, string]>()

  const handleDateChange: DateChangeHandler = (date, dateString) => {
    setDate(dateString)
  };

  const handleRangeChange: DateRangeChangeHandler = (dates, dateStrings) => {
    setDateRange(dateStrings)
  };

  const value = {
    getDate: handleDateChange,
    getDateRange: handleRangeChange,
    date,
    dateRange
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useDashBoard(): DashboardContextType {
  const result = useContext(DashboardContext);
  if (result === undefined) {
    throw new Error(
      "Dashboard Context was used outside of the Dashboard Provider"
    );
  }
  return result;
}
