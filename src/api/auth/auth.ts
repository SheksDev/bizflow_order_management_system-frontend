// import axios from "axios";
import api from "../axios";
import type { LoginErrors, LoginRequest } from "./types/auth";


export const validateLogin = (data: LoginRequest): LoginErrors => {

    const errors: LoginErrors = {};

    if (!data.email.trim()) {

        errors.email = "Email is required";

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {

        errors.email = "Please enter a valid email address";
    }

    if (!data.password.trim()) {

        errors.password = "Password is required";

    } else if (data.password.length < 6) {

        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

export const LoginUser = async (
    payload: LoginRequest
) => {

    const response = await api.post("/auth/login", payload);

    return response.data;
}