'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function TrustScoreChart({ trustScoreHistory, industryAverageHistory }: { 
  trustScoreHistory: number[],
  industryAverageHistory: number[] 
}) {
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Trust Score',
        data: trustScoreHistory,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
      },
      {
        label: 'Industry Average',
        data: industryAverageHistory,
        borderColor: '#94a3b8',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
      },
    ],
  };

  return (
    <Line data={chartData} options={{
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    }} />
  );
}

export function TransactionVolumeChart({ transactionVolume }: { transactionVolume: number[] }) {
  return (
    <Line
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Volume',
          data: transactionVolume,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
        }],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
} 