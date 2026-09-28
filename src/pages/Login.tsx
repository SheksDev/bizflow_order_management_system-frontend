import { useState } from "react";
import { LoginUser, validateLogin } from "../api/auth/auth"
import type { LoginErrors, LoginRequest } from "../api/auth/types/auth";
import LoginScreen from "../components/authentication/LoginScreen"
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();


    const [isLoading, setIsLoading] =useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [errors, setErrors] = useState<LoginErrors>({});

    const handleLogin = async (data: LoginRequest) => {

        const validationErrors = validateLogin(data);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {

            setErrMsg("");

            setIsLoading(true);

            const res = await LoginUser(data);

            console.log(res);

            localStorage.setItem("token", res.data?.accessToken);

            navigate("/dashboard");

        } catch(err) {

            if (axios.isAxiosError(err)) {
                setErrMsg(
                    err.response?.data?.message ?? "Login failed"
                );
                } else if (err instanceof Error) {
                setErrMsg(err.message);
                } else {
                setErrMsg("Something went wrong");
            }

        } finally {

            setIsLoading(false);
        }
    }
    return (
        <LoginScreen 
            onLogin={handleLogin}
            loading={isLoading}
            error={errMsg}
            fieldErrors={errors}
        />
    )
}

export default Login