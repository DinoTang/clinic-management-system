const API_URL = "http://localhost:8080/api";

/**
 * Lấy danh sách hóa đơn phân trang, có lọc theo status, method và tìm kiếm
 * GET /api/billing/invoices/paginate?page=...&size=...&status=...&method=...&search=...
 */
export async function getAllPaginate(page = 0, size = 10, status = "", method = "", search = "") {
    const params = new URLSearchParams({
        page,
        size,
    });

    if (status && status !== "all") {
        params.append("status", status);
    }
    if (method && method !== "all") {
        params.append("method", method);
    }
    if (search && search.trim() !== "") {
        params.append("search", search.trim());
    }

    const response = await fetch(`${API_URL}/billing/invoices/paginate?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Kết nối be that bai");
    }
    return response.json();
}

/**
 * Lấy danh sách hóa đơn chưa thanh toán
 * GET /api/billing/unpaid
 */
export async function getUnpaid() {
    const response = await fetch(`${API_URL}/billing/unpaid`);
    if (!response.ok) {
        throw new Error("Kết nối be that bai");
    }
    return response.json();
}

/**
 * Lấy danh sách tất cả hóa đơn (không phân trang, có thể lọc theo status)
 * GET /api/billing/invoices?status=...
 */
export async function getAll(status = "") {
    const url = status
        ? `${API_URL}/billing/invoices?status=${encodeURIComponent(status)}`
        : `${API_URL}/billing/invoices`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Kết nối be that bai");
    }
    return response.json();
}

/**
 * Lấy chi tiết 1 hóa đơn theo ID (kèm danh sách details)
 * GET /api/billing/invoices/{id}
 */
export async function getById(id) {
    const response = await fetch(`${API_URL}/billing/invoices/${id}`);
    if (!response.ok) {
        throw new Error("Không tìm thấy hóa đơn hoặc lỗi kết nối");
    }
    return response.json();
}

/**
 * Tạo mới hóa đơn
 * POST /api/invoices
 */
export async function createAsync(request) {
    const response = await fetch(`${API_URL}/invoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

/**
 * Thanh toán hóa đơn
 * PUT /api/billing/invoices/{id}/payment
 */
export async function payAsync(id, request) {
    const response = await fetch(`${API_URL}/billing/invoices/${id}/payment`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}
