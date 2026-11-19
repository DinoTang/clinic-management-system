const API_URL = "http://localhost:8080/api/services";

export async function getAllPaginate(
    page = 0,
    size = 10,
    serviceStatus = '',
    specialtyId = '',
    search = ''
) {
    const params = new URLSearchParams({
        page: page,
        size: size
    });

    if (serviceStatus && serviceStatus !== 'all') {
        params.append('serviceStatus', serviceStatus);
    }
    if (specialtyId && specialtyId !== 'all') {
        params.append('specialtyId', specialtyId);
    }
    if (search) {
        params.append('search', search);
    }

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

export async function getById(serviceCatalogId) {
    const response = await fetch(`${API_URL}/${serviceCatalogId}`);
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

export async function restoreById(serviceCatalogId) {
    const response = await fetch(`${API_URL}/restore/${serviceCatalogId}`, {
        method: "PUT"
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function softDeleteById(serviceCatalogId) {
    const response = await fetch(`${API_URL}/soft-delete/${serviceCatalogId}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function hardDeleteById(serviceCatalogId) {
    const response = await fetch(`${API_URL}/hard-delete/${serviceCatalogId}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}
