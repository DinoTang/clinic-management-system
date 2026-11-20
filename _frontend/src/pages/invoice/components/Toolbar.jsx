import React from 'react';
import { PAYMENT_STATUS, PAYMENT_METHOD } from '../../../enums/index.js';

export default function Toolbar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  methodFilter,
  onMethodChange,
  onResetData,
  onRefresh,
}) {
  const handleReset = () => {
    if (onSearchChange) onSearchChange('');
    if (onStatusChange) onStatusChange('');
    if (onMethodChange) onMethodChange('');
    if (onRefresh) onRefresh();
  };

  return (
    <div className="bg-white !p-4 rounded-lg shadow-sm border border-gray-200 !mb-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
      {/* Ô tìm kiếm */}
      <div className="w-full sm:w-80 !m-0 !p-0">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo mã HĐ, mã bệnh án, mã NV..."
          className="w-full !px-3 !py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bộ lọc trạng thái, phương thức & Nút reset dữ liệu */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end !m-0 !p-0">
        {/* Lọc theo trạng thái (PAYMENT_STATUS) */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="!px-3 !py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Tất cả trạng thái</option>
          {Object.entries(PAYMENT_STATUS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        {/* Lọc theo phương thức thanh toán (PAYMENT_METHOD) - chỉ hiện khi truyền prop */}
        {onMethodChange && (
          <select
            value={methodFilter || ''}
            onChange={(e) => onMethodChange(e.target.value)}
            className="!px-3 !py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả phương thức</option>
            {Object.entries(PAYMENT_METHOD).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        )}

        {/* Nút Reset dữ liệu */}
        <button
          type="button"
          onClick={handleReset}
          className="!px-4 !py-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-medium rounded-md transition"
        >
          Reset dữ liệu
        </button>
      </div>
    </div>
  );
}
