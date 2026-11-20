import { useState, useEffect, useCallback } from 'react';
import Toolbar from './components/Toolbar';
import DataTable from './components/DataTable';
import DetailModal from './components/DetailModal';
import { getAllPaginate, getById } from '../../services/invoice/invoiceService';
import Paginate from '../../layouts/components/Paginate.jsx';

function Invoice({ className = '' }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // State Modal xem chi tiết
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchInvoicesPaginate = useCallback(
    async (
      currentPage = page,
      currentSize = size,
      currentStatus = status,
      currentMethod = method,
      currentSearch = search
    ) => {
      setLoading(true);
      try {
        const result = await getAllPaginate(
          currentPage,
          currentSize,
          currentStatus,
          currentMethod,
          currentSearch
        );
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [page, size, status, method, search]
  );

  useEffect(() => {
    fetchInvoicesPaginate(page, size, status, method, search);
  }, [page, size, status, method, search, fetchInvoicesPaginate]);

  // Reset về trang đầu (page = 0) khi thay đổi bộ lọc hoặc từ khóa tìm kiếm
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setPage(0);
  };

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
    setPage(0);
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);
    setPage(0);
  };

  // Mở modal xem chi tiết hóa đơn
  const handleViewDetail = async (invoiceId) => {
    setIsDetailOpen(true);
    setLoadingDetail(true);
    setSelectedInvoice(null);
    try {
      const detailData = await getById(invoiceId);
      setSelectedInvoice(detailData);
    } catch (err) {
      alert(err.message || 'Lỗi khi tải chi tiết hóa đơn');
      setIsDetailOpen(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedInvoice(null);
  };

  if (loading && !data?.content) {
    return <p className="!p-4">Đang tải...</p>;
  }

  return (
    <div className={`flex flex-col gap-[1.25rem] ${className}`}>
      {/* Header tiêu đề */}
      <div className="min-w-0 shadow-sm rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <h1 className="text-xl font-bold text-gray-800 !m-0">Quản lý Hóa đơn</h1>
        <p className="text-sm text-gray-500 !mt-1 !mb-0">
          Theo dõi danh sách hóa đơn khám bệnh, dịch vụ và thuốc
        </p>
      </div>

      {/* Khối bảng dữ liệu & phân trang */}
      <div className="min-w-0 shadow-xl rounded-[0.6875rem] border border-[#edf0f4] bg-white !p-[1.25rem]">
        <Toolbar
          searchTerm={search}
          onSearchChange={handleSearchChange}
          statusFilter={status}
          onStatusChange={handleStatusChange}
          methodFilter={method}
          onMethodChange={handleMethodChange}
          onRefresh={() =>
            fetchInvoicesPaginate(page, size, status, method, search)
          }
        />

        <div className="!mt-[1rem]">
          <DataTable
            invoices={data.content || []}
            loading={loading}
            onViewDetail={handleViewDetail}
          />
        </div>

        <div className="!mt-[1rem]">
          <Paginate data={data} setPage={setPage} page={page} />
        </div>
      </div>

      {/* Modal xem chi tiết hóa đơn */}
      <DetailModal
        isOpen={isDetailOpen}
        loading={loadingDetail}
        invoice={selectedInvoice}
        onClose={handleCloseDetail}
      />
    </div>
  );
}

export default Invoice;
