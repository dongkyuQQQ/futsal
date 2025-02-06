'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Order {
  id: string;
  createdAt: string;
  businessName: string;
  fieldName: string;
  width: number;
  length: number;
  grassType: string;
  totalPrice: number;
  status: string;
  installationDate: string;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">주문 관리</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 주문 목록 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">신청일</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">구장명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">규격</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">금액</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">상태</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(order.createdAt), 'yyyy-MM-dd')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.fieldName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.width}m × {order.length}m
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.totalPrice.toLocaleString()}원
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status === 'PENDING' ? '대기중' :
                         order.status === 'CONFIRMED' ? '확정' : '취소'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        상세보기
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 상세 정보 */}
        {selectedOrder && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">주문 상세</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">구매자 정보</h3>
                <p>사업자명: {selectedOrder.businessName}</p>
                <p>구장명: {selectedOrder.fieldName}</p>
                <p>교체 희망일: {format(new Date(selectedOrder.installationDate), 'yyyy-MM-dd')}</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">상태 관리</h3>
                <div className="space-x-2">
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'CONFIRMED')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    확정
                  </button>
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'CANCELLED')}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 