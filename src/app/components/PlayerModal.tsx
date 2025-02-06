'use client';

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlayerFormData) => void;
}

interface PlayerFormData {
  name: string;
  position: string;
  number: string;
  birthDate: string;
  height: string;
  weight: string;
}

export default function PlayerModal({ isOpen, onClose, onSubmit }: PlayerModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      position: formData.get('position') as string,
      number: formData.get('number') as string,
      birthDate: formData.get('birthDate') as string,
      height: formData.get('height') as string,
      weight: formData.get('weight') as string,
    };
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">선수 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">이름</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">포지션</label>
              <select
                name="position"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">포지션 선택</option>
                <option value="GK">골키퍼</option>
                <option value="DF">수비수</option>
                <option value="MF">미드필더</option>
                <option value="FW">공격수</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">등번호</label>
              <input
                type="number"
                name="number"
                required
                min="1"
                max="99"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">생년월일</label>
              <input
                type="date"
                name="birthDate"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">키 (cm)</label>
              <input
                type="number"
                name="height"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">몸무게 (kg)</label>
              <input
                type="number"
                name="weight"
                required
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
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 