

export const getCSRFCookie = (name) => {
    if (name) {
        const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(name))?.split('=')[1]

        return cookieValue;
    }
}