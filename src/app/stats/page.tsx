'use client';

import { useState } from 'react';
import StatsCharts from '../components/StatsCharts';

interface PlayerStats {
  name: string;
  position: string;
  number: number;
  matches: number;
  goals: number;
  assists: number;
  minutesPlayed: number;
}

interface TeamStats {
  totalMatches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
}

export default function Stats() {
  // 예시 데이터
  const [teamStats] = useState<TeamStats>({
    totalMatches: 15,
    wins: 8,
    draws: 4,
    losses: 3,
    goalsFor: 25,
    goalsAgainst: 15,
  });

  const [playerStats] = useState<PlayerStats[]>([
    {
      name: '홍길동',
      position: 'FW',
      number: 10,
      matches: 14,
      goals: 8,
      assists: 5,
      minutesPlayed: 1150,
    },
    {
      name: '김철수',
      position: 'MF',
      number: 8,
      matches: 15,
      goals: 3,
      assists: 7,
      minutesPlayed: 1320,
    },
  ]);

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">팀 통계</h1>
      
      {/* 팀 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">경기 기록</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>총 경기</span>
              <span className="font-bold">{teamStats.totalMatches}경기</span>
            </div>
            <div className="flex justify-between">
              <span>승/무/패</span>
              <span className="font-bold">
                {teamStats.wins}승 {teamStats.draws}무 {teamStats.losses}패
              </span>
            </div>
            <div className="flex justify-between">
              <span>승률</span>
              <span className="font-bold">
                {((teamStats.wins / teamStats.totalMatches) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">득실점</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>득점</span>
              <span className="font-bold text-green-600">{teamStats.goalsFor}골</span>
            </div>
            <div className="flex justify-between">
              <span>실점</span>
              <span className="font-bold text-red-600">{teamStats.goalsAgainst}골</span>
            </div>
            <div className="flex justify-between">
              <span>득실차</span>
              <span className="font-bold">
                {teamStats.goalsFor - teamStats.goalsAgainst}골
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">경기당 평균</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>득점</span>
              <span className="font-bold">
                {(teamStats.goalsFor / teamStats.totalMatches).toFixed(1)}골
              </span>
            </div>
            <div className="flex justify-between">
              <span>실점</span>
              <span className="font-bold">
                {(teamStats.goalsAgainst / teamStats.totalMatches).toFixed(1)}골
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 차트 섹션 */}
      <StatsCharts teamStats={teamStats} playerStats={playerStats} />

      {/* 선수 통계 테이블 */}
      <h2 className="text-2xl font-bold mb-6">선수별 통계</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                선수명
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                포지션
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                등번호
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                출전
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                득점
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                어시스트
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                출전시간
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {playerStats.map((player, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{player.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.position}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.number}</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.matches}경기</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.goals}골</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.assists}개</td>
                <td className="px-6 py-4 whitespace-nowrap">{player.minutesPlayed}분</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 