import cookie from "cookie";

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : (document?.cookie || ""));
}

/**
 * Set Cookie
 *
 * @param {string} name Cookie Name
 * @param {string} value Cookie Value
 */
export function setCookie(name, value) {
    document.cookie = name + "=" + (value || "") + "; path=/";
}

/**
 * Get Cookie Value
 *
 * @param {string} name Cookie Name
 *
 * @returns {string|null} Cookie Value
 */
export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Remove Cookie
 *
 * @param {string} name Cookie Name
 */
export function eraseCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}


export function clearSessionStorage() {
    if (typeof window !== "undefined") {
        // Check if window is defined (this function should run in the browser)
        sessionStorage.clear();
    }
}