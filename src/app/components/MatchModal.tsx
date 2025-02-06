'use client';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MatchFormData) => void;
}

interface MatchFormData {
  date: string;
  opponent: string;
  venue: string;
  competition: string;
  ourScore: string;
  opponentScore: string;
  scorers: string;
  assists: string;
}

export default function MatchModal({ isOpen, onClose, onSubmit }: MatchModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      date: formData.get('date') as string,
      opponent: formData.get('opponent') as string,
      venue: formData.get('venue') as string,
      competition: formData.get('competition') as string,
      ourScore: formData.get('ourScore') as string,
      opponentScore: formData.get('opponentScore') as string,
      scorers: formData.get('scorers') as string,
      assists: formData.get('assists') as string,
    };
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">경기 기록</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">경기 일자</label>
              <input
                type="date"
                name="date"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">상대팀</label>
              <input
                type="text"
                name="opponent"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">경기장</label>
              <input
                type="text"
                name="venue"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">대회명</label>
              <input
                type="text"
                name="competition"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">우리팀 득점</label>
                <input
                  type="number"
                  name="ourScore"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">상대팀 득점</label>
                <input
                  type="number"
                  name="opponentScore"
                  required
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">득점자 (쉼표로 구분)</label>
              <input
                type="text"
                name="scorers"
                placeholder="홍길동(10분), 김철수(23분)"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">어시스트 (쉼표로 구분)</label>
              <input
                type="text"
                name="assists"
                placeholder="이영희(10분), 박지성(23분)"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              기록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 