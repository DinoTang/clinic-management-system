const API_URL = "http://localhost:8080/api/staffs";

export async function getAll() {
	const response = await fetch(API_URL);
	if(!response.ok)
		throw new Error("Kết nối be that bai");
	return response.json();
}

export async function updatePosition(staffId, position){
	const response = await fetch(`${API_URL}/update-position/${staffId}`,{
		method: "PUT",
		headers: {
			"Content-Type":"application/json",
		},
		body: position,
 	});

	const data = await response.json();
	if(!response.ok)
		throw data;
	return data;
}

export async function softDelete(staffId){
	const response = await fetch(`${API_URL}/soft-delete/${staffId}`,{
		method: "DELETE"
	});
	const data = await response.json();
	if(!response.ok)
		throw data;
	return data;

}

export async function restore(staffId) {
	const response = await fetch(`${API_URL}/restore/${staffId}`,{
		method: "PUT"
	});
	const data = await response.json();
	if(!response.ok)
		throw data;
	return data;

}