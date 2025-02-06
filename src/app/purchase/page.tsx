'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface PurchaseForm {
  businessName: string;
  fieldName: string;
  address: string;
  installationDate: string;
  paymentType: 'full' | 'installment';
  installmentMonths?: number;
}

export default function PurchasePage() {
  const searchParams = useSearchParams();
  const width = searchParams.get('width');
  const length = searchParams.get('length');
  const grassType = searchParams.get('grassType');
  const total = searchParams.get('total');
  const calculationString = searchParams.get('calculation');
  
  let calculation = null;
  try {
    if (calculationString) {
      calculation = JSON.parse(calculationString);
    }
  } catch (error) {
    console.error('Failed to parse calculation:', error);
  }

  const [form, setForm] = useState<PurchaseForm>({
    businessName: '',
    fieldName: '',
    address: '',
    installationDate: '',
    paymentType: 'full',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 임시로 성공 메시지만 표시
    alert('신청이 완료되었습니다.');
    window.location.href = '/';
    
    /* 기존 API 호출 코드 주석 처리
    if (!calculation) {
      alert('견적 정보가 없습니다. 다시 시도해주세요.');
      return;
    }

    // 필수 입력값 검증
    if (!form.businessName || !form.fieldName || !form.address || !form.installationDate) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    try {
      // 전송할 데이터 구성
      const submitData = {
        width: parseFloat(width || '0'),
        length: parseFloat(length || '0'),
        grassType,
        total: parseFloat(total || '0'),
        ...form,
        calculation
      };

      // 전송 데이터 로깅
      console.log('전송 데이터:', {
        제품정보: {
          가로: submitData.width,
          세로: submitData.length,
          잔디타입: submitData.grassType,
          총금액: submitData.total
        },
        구매자정보: {
          사업자명: submitData.businessName,
          구장명: submitData.fieldName,
          주소: submitData.address,
          설치희망일: submitData.installationDate
        }
      });

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('서버 응답:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        alert('신청이 완료되었습니다.');
        window.location.href = '/';
      } else {
        throw new Error(data.error || '알 수 없는 오류가 발생했습니다');
      }
    } catch (error) {
      console.error('제출 오류:', error);
      alert(error instanceof Error ? error.message : '신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
    */
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">구매 정보 입력</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">선택한 제품 정보</h2>
          <div className="space-y-4">
            <p><span className="font-bold">규격:</span> {width}m × {length}m</p>
            <p><span className="font-bold">잔디 타입:</span> {grassType}</p>
            <p><span className="font-bold">총 견적가:</span> {parseInt(total || '0').toLocaleString()}원</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-6">구매자 정보</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                사업자명
              </label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => setForm({...form, businessName: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                구장명
              </label>
              <input
                type="text"
                value={form.fieldName}
                onChange={(e) => setForm({...form, fieldName: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                교체 희망 일자
              </label>
              <input
                type="date"
                value={form.installationDate}
                onChange={(e) => setForm({...form, installationDate: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                결제 방식
              </label>
              <select
                value={form.paymentType}
                onChange={(e) => setForm({...form, paymentType: e.target.value as 'full' | 'installment'})}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="full">일시불</option>
                <option value="installment">할부</option>
              </select>
            </div>
            
            {form.paymentType === 'installment' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  할부 개월
                </label>
                <select
                  value={form.installmentMonths}
                  onChange={(e) => setForm({...form, installmentMonths: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="3">3개월</option>
                  <option value="6">6개월</option>
                  <option value="12">12개월</option>
                  <option value="24">24개월</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors mt-6"
            >
              구매 신청하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 