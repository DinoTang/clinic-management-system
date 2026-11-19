const API_URL = "http://localhost:8080/api/medicines";

export async function getAllPaginate(page = 0, size = 10, status = 'all', search = '') {
    const params = new URLSearchParams({
        page: page,
        size: size,
        status: status,
        search: search
    });

    const response = await fetch(`${API_URL}/v2?${params.toString()}`);
    if (!response.ok) {
        throw new Error("Kết nối backend thất bại");
    }
    return response.json();
}

export async function getAll() {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
        throw new Error("Kết nối backend thất bại");
    }
    return response.json();
}

export async function getById(medicineId) {
    const response = await fetch(`${API_URL}/${medicineId}`);
    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function createAsync(request) {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function updateProfile(request) {
    const response = await fetch(`${API_URL}/update-profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}


export async function restoreById(medicineId) {
    const response = await fetch(`${API_URL}/restore/${medicineId}`, {
        method: "PUT"
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function softDeleteById(medicineId) {
    const response = await fetch(`${API_URL}/soft-delete/${medicineId}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function hardDeleteById(medicineId) {
    const response = await fetch(`${API_URL}/hard-delete/${medicineId}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}
