const API_URL = "/api/auth";

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
        throw data;
    }
    return data;
}

export async function loginGoogle() {
    const response = await fetch(`${API_URL}/oauth-success`);

    const data = await response.json();
    if (!response.ok) {
        throw data;
    }
    return data;
}

export async function register(request) {
    const response = await fetch(`${API_URL}/register`,{
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