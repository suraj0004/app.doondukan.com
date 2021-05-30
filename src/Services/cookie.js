import Cookie from 'universal-cookie';
const cookie = new Cookie();

export const setCookie = (key, value, options = { path : '/' }) => {
    cookie.set(key, value, options);
}
export const getCookie = (key) => {
    return cookie.get(key);
}
export const removeCookie = (key) => {
    cookie.remove(key);
}
