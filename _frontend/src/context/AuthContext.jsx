import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = Cookies.get("user");
        try {
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        return Cookies.get("token") || null;
    });

    const login = (newToken, userData) => {
        let cookieOptions = { expires: 7, sameSite: "strict" };

        if (window.location.protocol === "https:") {
            cookieOptions.secure = true;
        }

        try {
            const decoded = jwtDecode(newToken);
            if (decoded.exp) {
                cookieOptions.expires = new Date(decoded.exp * 1000);
            }
        } catch (error) {
            console.error("Không thể giải mã token:", error);
        }

        Cookies.set("token", newToken, cookieOptions);
        Cookies.set("user", JSON.stringify(userData), cookieOptions);

        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("user");

        setToken(null);
        setUser(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
