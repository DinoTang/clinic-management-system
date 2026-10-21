const API_URL = "http://localhost:8080/api/users";

export async function updateProfile(userId, request) {
	const response = await fetch(`${API_URL}/update-profile/${userId}`,{
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

export async function getAll(page, size) {
	const response = await fetch(`${API_URL}?page=${page}&size=${size}`);
	if(!response.ok)
		throw new Error("Kết nối be that bai");
	return response.json();
}

export async function updateStatus(request){
	const response = await fetch(`${API_URL}/update-status`,{
		method: "PUT",
		headers: {
			"Content-Type":"application/json",
		},
		body: JSON.stringify({
			"userId":request.userId,
			"status": request.status
		}),
 	});

	const data = await response.json();
	if(!response.ok)
		throw data;
	return data;
}
