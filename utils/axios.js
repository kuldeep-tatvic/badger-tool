import { eraseCookie, parseCookies, setCookie } from "@utils/cookie";
import axios from "axios";

const refreshUrl = "/auth/refresh";

/**
 * Handle axios instance changes
 * @return {AxiosInstance}
 */
export default function axiosInstance() {

    const accessToken = parseCookies().accessToken;

    const api = axios.create({
        headers: {
            Accept: "application/json",
            authorization: `${accessToken}`,
        },
        responseType: "json",
    });

    api.interceptors.response.use(
        response => {
            return response;
        },
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; // mark this request as having been retried

                try {
                    const refreshToken = parseCookies().refreshToken;
                    // Attempt to get a new access token using the refresh token
                    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${refreshUrl}`, {
                        refreshToken
                    });

                    // If successful, update the cookie and retry the original request
                    setCookie("accessToken", data.data);
                    originalRequest.headers["Authorization"] = `${data.data}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    if (refreshError.response && refreshError.response.status === 401) {
                        eraseCookie("accessToken");
                        eraseCookie("refreshToken");
                        window.location.href = "/";
                        return Promise.reject(refreshError);
                    }
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return api;
};