const API_URL = "http://localhost:8080/api/doctors";

export async function getAll(page, size, specialty, status='all', search='') {
	const response = await fetch(`${API_URL}?page=${page}&size=${size}&specialty=${specialty}&status=${status}&search=${search}`);
	if(!response.ok)
		throw new Error("Kết nối be that bai");
	return response.json();
}

export async function createAsync(request) {
    const response = await fetch(`${API_URL}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    });

    const data= await response.json();
    if(!response.ok){
        throw data;
    }
    return data;
}

export async function updateProfile(request) {
    const response = await fetch(`${API_URL}/update-profile`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    });

    const data = await response.json();
    if(!response.ok)
        throw data;
    return data;
}