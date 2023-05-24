function getAuthHeader() {
    const token = localStorage.getItem("accessToken");

    const authHeader = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return authHeader;
}

function getProfile(): string {
    const profile = localStorage.getItem("profile") as string;

    return profile;
}

function getUser(): string {
    const user = localStorage.getItem("user") as string;

    return user;
}

export { getAuthHeader, getProfile, getUser };