'use client';

import { useState } from 'react';
import MatchModal from '../components/MatchModal';

interface Match {
  date: string;
  opponent: string;
  venue: string;
  competition: string;
  ourScore: number;
  opponentScore: number;
  scorers: string;
  assists: string;
}

export default function Matches() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [matches, setMatches] = useState<Match[]>([
    {
      date: '2024-03-15',
      opponent: 'FC 서울',
      venue: '상암월드컵경기장',
      competition: 'K리그1',
      ourScore: 2,
      opponentScore: 1,
      scorers: '홍길동(10분), 김철수(23분)',
      assists: '이영희(10분), 박지성(23분)',
    },
  ]);

  const handleAddMatch = (data: any) => {
    const newMatch = {
      ...data,
      ourScore: parseInt(data.ourScore),
      opponentScore: parseInt(data.opponentScore),
    };
    setMatches([...matches, newMatch]);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">경기 기록</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          경기 기록 추가
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                날짜
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                대회
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상대팀
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                경기장
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                스코어
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                득점자
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.map((match, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{match.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{match.competition}</td>
                <td className="px-6 py-4 whitespace-nowrap">{match.opponent}</td>
                <td className="px-6 py-4 whitespace-nowrap">{match.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {match.ourScore} - {match.opponentScore}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{match.scorers}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">수정</button>
                  <button className="text-red-600 hover:text-red-900">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <MatchModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMatch}
      />
    </div>
  );
} 