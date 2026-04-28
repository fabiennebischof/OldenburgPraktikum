import axios from "axios";

const USERNAME = "csd";
const PASSWORD = "csd";
const TOKEN = "zuuQtRg4a2n2SDoY2Ad3Gnbv0BSSNsH0";

export const api = axios.create({
    baseURL: "https://192.168.137.26/api/v1",
    auth: {
        username: USERNAME,
        password: PASSWORD
    },
    headers: {
        "Content-Type": "application/json"
    },
    params: {
        token: TOKEN
    },
    timeout: 5000
});
