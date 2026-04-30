import axios from "axios";

const USERNAME = "csd";
const PASSWORD = "csd";
const TOKEN = "zuuQtRg4a2n2SDoY2Ad3Gnbv0BSSNsH0";
const BASE_URL = "/api/v1"

export const api = axios.create({
    baseURL: BASE_URL,
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
});
