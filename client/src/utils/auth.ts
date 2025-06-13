export const getToken = (): string | null => {
    return localStorage.getItem("token");
};
export const setToken = (token: string) => {
    return localStorage.setItem("token", token);
};
export const removeToken = () => {
    localStorage.removeItem("token");
};
export const isAuthenticated = (): boolean => {
    return !!getToken();
};
