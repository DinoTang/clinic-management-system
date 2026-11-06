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

export async function updateStatus(request){
	const response = await fetch(`${API_URL}/update-status`,{
		method: "PUT",
		headers: {
			"Content-Type":"application/json",
		},
		body: JSON.stringify(request),
 	});

	const data = await response.json();
	if(!response.ok)
		throw data;
	return data;
}

