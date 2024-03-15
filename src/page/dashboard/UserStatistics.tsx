import React, { useEffect, useState } from "react";
import { getStatisticsUser } from "../../services/apiStatistics";
import { Doughnut } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Stats {
  numAdmins: number;
  numHosts: number;
  numMembers: number;
}

export const UserStatistics = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function getAll() {
      try {
        const response = await getStatisticsUser();
        setStats(response.stats);
      } catch (error) {
        console.log(error);
      }
    }

    getAll();
  }, []);

  const data = {
    labels: ["Member", "Host", "Admin"],
    datasets: [
      {
        label: "My First Dataset",
        data: [stats?.numMembers, stats?.numHosts, stats?.numAdmins],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    legend: {
      position: 'right'
    },
    plugins: {} // Add this line
  }

  return <Doughnut data={data} options={options}/>;
};
