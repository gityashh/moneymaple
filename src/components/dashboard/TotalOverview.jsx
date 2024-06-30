import React from "react";
import { CiStar } from "react-icons/ci";
import { HiBadgeCheck } from "react-icons/hi";

function TotalOverview({monthly, yearly}) {

    return (
        <div className=" flex items-center gap-2 pb-10">
            <div className="h-[10vw] w-[28vw] bg-zinc-800 flex flex-col px-2 py-1 rounded-sm">
                <p className="text-zinc-500 font-light  text-[1.2vw]">Monthly Spend</p>
                <div className="flex items-center justify-between w-full pr-6 pt-8">
                <h1 className="text-zinc-200 text-[4rem] font-rejouice font-thin px-2">₹ {monthly}</h1>
                <svg width="200" height="80" viewBox="0 0 103 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 17L5 6.5L11 7.5L17 2.5L23 14L32.5 7.5H42.5L50.5 2L60 18.5L70 9L75.5 15.5L84.5 3.5L94 15.5L102 6.5" stroke="#79E99F" stroke-width="2" stroke-linecap="round"/>
</svg>

                </div>
            </div>
            <div className="h-[10vw] w-[28vw] bg-zinc-800 flex flex-col px-2 py-1 rounded-sm">
                <p className="text-zinc-500 font-light text-[1.2vw]">Yearly Spend</p>
                <div className="flex items-center justify-between w-full pr-6 pt-8">
                <h1 className="text-zinc-200 text-[4rem] font-rejouice font-thin px-2">₹ {yearly}</h1>
                <svg width="200" height="80" viewBox="0 0 103 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 17L5 6.5L11 7.5L17 2.5L23 14L32.5 7.5H42.5L50.5 2L60 18.5L70 9L75.5 15.5L84.5 3.5L94 15.5L102 6.5" stroke="#E3D239" stroke-width="2" stroke-linecap="round"/>
</svg>
                </div>
            </div>
            <div className="bg-[#E3D239] h-[10vw] w-[14vw] rounded-sm p-4">
                <div className="flex items-center justify-between">
                <h2 className="text-[1.5vw]">Upgrade</h2>
                <HiBadgeCheck className="scale-[1.8]"/>
                </div>
                <p className="text-zinc-500 leading-4 pt-3">Get more innformation and opportunities</p>
                <div className="h-10 w-20 bg-zinc-900 text-zinc-200 rounded-md px-3 py-2 mt-4">Go pro</div>
            </div>
        </div>
    );
}

export default TotalOverview;
