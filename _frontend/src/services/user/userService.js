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
