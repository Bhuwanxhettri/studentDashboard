export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}
export function setToken(token) {
  if (typeof window !== "undefined") {
    // Access window-related code here
    localStorage.setItem("access_token", token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    const token = localStorage?.getItem("access_token");
    return token || null;
  }
}

export function getLoginState() {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("isLoggedIn"));
  }
}