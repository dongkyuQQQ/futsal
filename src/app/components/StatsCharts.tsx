'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatsChartsProps {
  teamStats: {
    wins: number;
    draws: number;
    losses: number;
  };
  playerStats: {
    name: string;
    goals: number;
    assists: number;
  }[];
}

export default function StatsCharts({ teamStats, playerStats }: StatsChartsProps) {
  const goalDistributionData = {
    labels: playerStats.map(player => player.name),
    datasets: [
      {
        label: '득점',
        data: playerStats.map(player => player.goals),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: '어시스트',
        data: playerStats.map(player => player.assists),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const matchResultData = {
    labels: ['승', '무', '패'],
    datasets: [
      {
        data: [teamStats.wins, teamStats.draws, teamStats.losses],
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(234, 179, 8, 0.6)',
          'rgba(239, 68, 68, 0.6)',
        ],
        borderColor: [
          'rgb(34, 197, 94)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">경기 결과 분포</h3>
        <div className="aspect-square">
          <Pie 
            data={matchResultData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">선수별 공격 포인트</h3>
        <Bar
          data={goalDistributionData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
} 