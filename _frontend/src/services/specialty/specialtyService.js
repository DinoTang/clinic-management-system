const API_URL = "http://localhost:8080/api/specialties";

export async function getAllPaginate(page, size, status='all', search='') {
	const response = await fetch(`${API_URL}/v2?page=${page}&size=${size}&status=${status}&search=${search}`);
	if(!response.ok)
		throw new Error("Kết nối be that bai");
	return response.json();
}

export async function getAll() {
	const response = await fetch(`${API_URL}`);
	if(!response.ok)
		throw new Error("Kết nối be that bai");
	return response.json();
}