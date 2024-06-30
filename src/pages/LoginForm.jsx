import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
    const [diasble, setDisable] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgetPassword, setForgetPassword] = useState(false);

    const { token, setToken, saveToken, url } = useAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleRegistration = (e) => {
        e.preventDefault();
        setDisable(true);
        if (!email || !password) {
            alert("Please fill all fields");
        } else {
            axios({
                url: url + "/login",
                method: "POST",
                headers: {
                    authorization: "bearer",
                },
                data: { email, password },
            })
                .then((res) => {
                    if (res.data.error) {
                        toast(res.data.error);
                        setForgetPassword(true);
                        setDisable(false);
                    } else {
                        toast("Login Successful");
                        setToken(res.data.access_token);
                        saveToken(res.data.access_token);
                    }
                })
                .catch((err) => {
                    toast("Error Occured");
                    setDisable(false);
                });
        }
    };

    const navigateToRegistration = () => {
        setToken(false);
        navigate("/register");
    };

    return (
        <div className="registration-container">
            <ToastContainer />
            <div className="registration-form-div half-size-div">
                <form
                    onSubmit={handleRegistration}
                    className="registration-form"
                >
                    <h1 className="text-zinc-200 text-[2rem] font-thin pb-10">Login</h1>
                    <input
                        type="email"
                        className=" bg-zinc-900 border-[.1px] py-6 rounded-sm font-light text-zinc-200"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className=" bg-zinc-900 border-[.1px] py-6 rounded-sm font-light text-zinc-200"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className={
                            "bg-zinc-900  py-6 rounded-sm font-light w-full " +
                            (diasble ? "disabled-button" : "primary-btn")
                        }
                        disabled={diasble}
                    >
                        Login
                    </button>
                </form>

                <div className="login-page">
                    Create an Account?{" "}
                    <button
                        onClick={navigateToRegistration}
                        anchor-button
                        className="anchor-button"
                    >
                        Register
                    </button>
                </div>
                {forgetPassword && (
                    <div>
                        <button
                            onClick={() => navigate("/forgetpassword")}
                            anchor-button
                            className="anchor-button"
                        >
                            Forget Password
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginForm;
