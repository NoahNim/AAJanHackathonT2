export const getCookie = (name) => {
    if (name) {
        const cookieValue = document.cookie.split("; ").find((row) => row.startsWith(name))?.split('=')[1]

        return cookieValue;
    }
}

export const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}