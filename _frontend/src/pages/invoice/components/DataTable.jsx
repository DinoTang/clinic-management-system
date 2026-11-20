import { Hashtag } from "@boxicons/react";
import React from 'react';
import { PAYMENT_STATUS, PAYMENT_METHOD } from '../../../enums/index.js';

const formatCurrency = (value) => {
  if (value == null) return '0 ₫';
  return Number(value).toLocaleString('vi-VN') + ' ₫';
};

const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function DataTable({ invoices, loading, onViewDetail }) {
  const renderStatusBadge = (status) => {
    const label = status;

    if (status === PAYMENT_STATUS.PAID) {
      return (
        <span className="!px-2.5 !py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
          {label}
        </span>
      );
    }

    if (status === PAYMENT_STATUS.CANCELLED) {
      return (
        <span className="!px-2.5 !py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
          {label}
        </span>
      );
    }

    return (
      <span className="!px-2.5 !py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
        {label}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden !m-0 !p-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase">
              <th className="!py-3 !px-4"><Hashtag /></th>
              <th className="!py-3 !px-4">Mã bệnh án</th>
              <th className="!py-3 !px-4">Nhân viên lập</th>
              <th className="!py-3 !px-4">Ngày tạo</th>
              <th className="!py-3 !px-4 text-right">Tổng tiền</th>
              <th className="!py-3 !px-4">Phương thức</th>
              <th className="!py-3 !px-4 text-center">Trạng thái</th>
              <th className="!py-3 !px-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="8" className="!py-8 !px-4 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : (
              invoices.map((inv, index) => (
                <tr key={inv.id} className="hover:bg-gray-50 transition">
                  <td className="!py-3 !px-4 font-medium text-blue-600">
	                  <div className="flex items-center gap-[0.75rem]">
	                    <span className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-full bg-[#eff6ff] text-[0.8125rem] font-semibold text-[#2563eb]">
	                      {index + 1}
	                    </span>

	                    <span className="font-medium text-[#101828]">
		                    {inv.id}
	                    </span>
	                  </div>
                  </td>
                  <td className="!py-3 !px-4">{inv.medicalRecordId}</td>
                  <td className="!py-3 !px-4">{inv.staffId}</td>
                  <td className="!py-3 !px-4">{formatDateTime(inv.createdAt)}</td>
                  <td className="!py-3 !px-4 text-right font-semibold text-gray-900">
                    {formatCurrency(inv.total)}
                  </td>
                  <td className="!py-3 !px-4">
                    {inv.paymentMethod || '—'}
                  </td>
                  <td className="!py-3 !px-4 text-center">
                    {renderStatusBadge(inv.paymentStatus)}
                  </td>
                  <td className="!py-3 !px-4 text-center">
                    <button
                      onClick={() => onViewDetail(inv.id)}
                      className="!px-3 !py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
