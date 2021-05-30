import Axios from "axios";
import { getCookie } from 'Services/cookie'
import { login_cookie_key} from "Helpers/constant"

export const api = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_PATH,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const authApi = Axios.create({
    baseURL: process.env.REACT_APP_API_BASE_PATH,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie(login_cookie_key)
    }
});
