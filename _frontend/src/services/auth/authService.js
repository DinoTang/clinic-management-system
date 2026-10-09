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
        throw data;
    }
    return data;
}

export async function register({username, password, email, fullName, phone}) {
    const response = await fetch(`${API_URL}/register`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password":password,
            "email": email,
            "phone": phone,
            "fullName": fullName
        })
    });

    const data= await response.json();
    if(!response.ok){
        throw data;
    }
    return data;
}