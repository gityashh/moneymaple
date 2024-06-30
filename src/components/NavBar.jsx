import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import SettingIcon from "../assets/setting-icon.svg";
import LogOutIcon from "../assets/logout-icon.svg";
import { CiSettings, CiUser } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { CiGrid42 } from "react-icons/ci";
import { CiAlignBottom } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiCoinInsert } from "react-icons/ci";
import { CiMicrochip } from "react-icons/ci";
import { useState,useEffect } from "react";



function NavBar() {
    const navigate = useNavigate();
    const {  setToken } = useAuthentication();

    const handleLogout = () => {
        localStorage.clear();
        setToken(false)
        navigate('/register')
    };
    


    return (
        <div className="nav-bar-container bg-zinc-800">
            <div className="pl-8 py-10 flex items-center gap-5">
                <div className="h-12 w-12 bg-zinc-600 rounded-full flex items-center justify-center">
                  <CiUser className="scale-[2] text-zinc-100"/>
                </div>
                <div>
                    <h1 className="font-md text-zinc-200 cursor-default">yash12</h1>
                    <h4 className="font-thin text-[.8rem] text-zinc-400 cursor-default">yashrajput8359@gmail.com</h4>
                </div>
            </div>

            <div className="main-nav-container bg-zinc-800 h-screen text-zinc-100 font-thin">
                <button
                    className="nav-component main-nav-component "
                    onClick={() => navigate("/")}
                >
                    <CiGrid42 className="mt-1 mr-3 inline-block scale-[1.5]" />
                    DashBoard
                </button>
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/analysis")}
                >
                    <CiAlignBottom className="mt-1 mr-3 inline-block scale-[1.5]"/>
                    Analysis
                </button>
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/reminder")}
                >
                    <CiCalendar className="mt-1 mr-3 inline-block scale-[1.5]"/>
                    Reminder
                    
                </button>
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/expenses")}
                >
                    <CiCoinInsert className="mt-1 mr-3 inline-block scale-[1.5]"/>
                    Expenses
                </button>
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/talkai")}
                >
                    <CiMicrochip className="mt-1 mr-3 inline-block scale-[1.5]"/>
                    Talk AI
                </button>
            </div>
            <div className="sub-nav-container h-40 font-thin text-zinc-200  bg-zinc-800">
                <button
                    className="nav-component flex items-center"
                    onClick={() => navigate("/setting")}
                >
                    <CiSettings className="mt-1 mr-3 inline-block scale-[1.5]"/>
                    Setting
                </button>
                <button className="nav-component" onClick={handleLogout}>
                <CiLogin  className="mt-1 mr-3 inline-block scale-[1.5] translate-x-[-20%]" />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default NavBar;
