import React from 'react';
import {
  PAYMENT_STATUS,
  PAYMENT_METHOD,
  INVOICE_ITEM_TYPE,
} from '../../../enums/index.js';

const formatCurrency = (value) => {
  if (value == null) return '0 ₫';
  return Number(value).toLocaleString('vi-VN') + ' ₫';
};

const formatDateTime = (dateString) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleString('vi-VN');
};

const getStatusColorClass = (status) => {
  switch (status) {
    case PAYMENT_STATUS.PAID:
      return 'text-green-600';
    case PAYMENT_STATUS.CANCELLED:
      return 'text-red-600';
    default:
      return 'text-amber-600';
  }
};

export default function DetailModal({ isOpen, loading, invoice, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden !m-0 !p-0">
        {/* Header */}
        <div className="!px-6 !py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 !m-0">
            Chi tiết hóa đơn {invoice ? `#${invoice.id}` : ''}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold leading-none !p-0"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="!p-6 overflow-y-auto flex-1">
          {loading || !invoice ? (
            <div className="!py-12 text-center text-gray-500">
              Đang tải chi tiết hóa đơn...
            </div>
          ) : (
            <>
              {/* Thông tin chung của Invoice */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 !mb-6 !p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                <div>
                  <span className="text-gray-500 block">Mã bệnh án:</span>
                  <span className="font-semibold text-gray-800">
                    {invoice.medicalRecordId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Nhân viên lập:</span>
                  <span className="font-semibold text-gray-800">
                    {invoice.staffId}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Trạng thái:</span>
                  <span
                    className={`font-semibold ${getStatusColorClass(
                      invoice.paymentStatus
                    )}`}
                  >
                    {invoice.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Ngày tạo:</span>
                  <span className="font-medium text-gray-800">
                    {formatDateTime(invoice.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">
                    Thời gian thanh toán:
                  </span>
                  <span className="font-medium text-gray-800">
                    {formatDateTime(invoice.paidAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Phương thức TT:</span>
                  <span className="font-medium text-gray-800">
                    {invoice.paymentMethod || '—'}
                  </span>
                </div>
              </div>

              {/* Bảng chi tiết các mục thu (InvoiceDetail) */}
              <h3 className="text-sm font-bold text-gray-700 uppercase !mb-3 !mt-0">
                Danh sách mục thu
              </h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden !mb-6">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200 text-xs text-gray-600 uppercase">
                      <th className="!py-2.5 !px-3">Loại</th>
                      <th className="!py-2.5 !px-3">Tên mục thu</th>
                      <th className="!py-2.5 !px-3 text-center">SL</th>
                      <th className="!py-2.5 !px-3 text-right">Đơn giá</th>
                      <th className="!py-2.5 !px-3 text-right">Thành tiền</th>
                      <th className="!py-2.5 !px-3">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoice.details && invoice.details.length > 0 ? (
                      invoice.details.map((item) => (
                        <tr key={item.id}>
                          <td className="!py-2.5 !px-3 text-xs font-medium text-gray-600">
                            {item.itemType ||
                              'Khác'}
                          </td>
                          <td className="!py-2.5 !px-3 font-medium text-gray-800">
                            {item.itemName}
                          </td>
                          <td className="!py-2.5 !px-3 text-center">
                            {item.quantity}
                          </td>
                          <td className="!py-2.5 !px-3 text-right">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="!py-2.5 !px-3 text-right font-semibold">
                            {formatCurrency(item.totalPrice)}
                          </td>
                          <td className="!py-2.5 !px-3 text-gray-500 text-xs">
                            {item.note || '—'}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="!py-4 !px-3 text-center text-gray-500"
                        >
                          Không có chi tiết mục thu.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Tổng kết tiền */}
              <div className="flex justify-end">
                <div className="w-full sm:w-72 space-y-2 text-sm">
                  <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 !pt-2">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">
                      {formatCurrency(invoice.total)}
                    </span>
                  </div>
                  {invoice.paymentStatus === 'PAID' && (
                    <>
                      <div className="flex justify-between text-gray-600">
                        <span>Tiền khách đưa:</span>
                        <span>{formatCurrency(invoice.amountGiven)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Tiền thối lại:</span>
                        <span>{formatCurrency(invoice.changeAmount)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="!px-6 !py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="!px-4 !py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md transition"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
