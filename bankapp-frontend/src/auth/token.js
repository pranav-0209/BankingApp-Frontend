export function setToken(token) {
    if (!token) return;
    localStorage.setItem("jwtToken", token);
}

export function getToken() {
    return localStorage.getItem("jwtToken");
}

export function clearToken() {
    localStorage.removeItem("jwtToken");
}

export function getDecoded() {
    const token = getToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            name: payload.sub || payload.name, // Check both sub and name fields
            email: payload.email,
            userId: payload.userId || payload.sub,
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export function isAuthenticated() {
    const token = getToken();
    if (!token) return false;
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const now = Math.floor(Date.now() / 1000);
        return payload.exp > now;
    } catch {
        return false;
    }
}