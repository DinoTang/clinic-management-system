const API_URL = "http://localhost:8080/api/auth";

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
    });

    const data = await response.json();
    if (!response.ok) {
    	if(response.status==400){
	        throw new Error(data.password ?? data.username ?? data.message);    		
    	}
        throw new Error(data.message);
    }
    return data;
}