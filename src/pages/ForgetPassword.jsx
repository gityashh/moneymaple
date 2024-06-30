import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
    const [diasble, setDisable] = useState(false);
    const [activate, setActivate] = useState(true);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const { token, setToken, saveToken, url } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        setDisable(true);
        if (!email) {
            alert("Please fill all fields");
        } else {
            axios({
                url: url + "/forget_password_login",
                method: "POST",
                headers: {
                    authorization: "bearer",
                },
                data: { email, otp, password },
            })
                .then((res) => {
                    if (res.data.error) {
                        toast(res.data.error);
                        setDisable(false);
                    } else {
                        setToken(res.data.access_token);
                        saveToken(res.data.access_token);
                        toast("Password Changed Successfully");
                    }
                })
                .catch((err) => {
                    toast("Error Occured");
                    setDisable(false);
                });
        }
    };

    const handleOtp = (e) => {
        e.preventDefault();

        setDisable(true);
        axios({
            url: url + "/forget_password_otp",
            method: "POST",
            headers: {
                authorization: "asdf",
            },
            data: { email },
        })
            .then((res) => {
                if (res.data.error) {
                    toast(res.data.error);
                    setDisable(false);
                } else {
                    toast("Otp Sent Successfully");
                    setActivate(false);
                    setDisable(false);
                }
            })
            .catch((err) => {
                toast("Error Occured while Sending the OTP.");
                setDisable(false);
            });
    };

    return (
        <div className="registration-container">
            <ToastContainer />
            {activate && (
                <div className="registration-form-div half-size-div">
                    <form onSubmit={handleOtp} className="registration-form">
                        <h1 className="text-zinc-200 text-[2rem] font-thin pb-10">Forgot Password</h1>
                        <input
                            type="email"
                            className=" bg-zinc-900 border-[.1px] py-6 rounded-sm font-light text-zinc-200"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className={
                                "bg-[#7BF0A9] py-4 rounded-sm font-light w-[300px]" +
                                (diasble ? "disabled-button" : "primary-btn")
                            }
                            disabled={diasble}
                        >
                            Register
                        </button>
                    </form>
                    <div className="login-page">
                        Already Registered?
                        <button
                            onClick={() => {
                                navigate("/login");
                            }}
                            className="anchor-button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}
            {!activate && (
                <div className="registration-otp-div">
                    <form onSubmit={handleLogin} className="registration-form">
                        <h1 className="main-heading">OTP Verification</h1>
                        <input
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className={
                                "btn " +
                                (diasble ? "disabled-button" : "primary-btn")
                            }
                        >
                            Confirm
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ForgetPassword;
