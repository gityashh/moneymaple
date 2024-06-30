import React from "react";
import { HiTrendingUp,HiTrendingDown } from "react-icons/hi";

function TagCard({ tag, tagAmount, tagStatus, icon }) {
    const IconComponent = icon;
    const ArrowComponent = tagStatus === "HiTrendingUp" ? HiTrendingDown : HiTrendingUp;

    return (
        <div className="bg-zinc-800 h-16 w-[28vw] px-3 py-1 text-zinc-500 flex flex-col justify-between">
            <div className="tag-based-heading-div flex items-center gap-2 font-light">
                <IconComponent className="tag-based-icon" />{" "}
                {/* Render the icon component */}
                <div className="tag-based-heading">{tag}</div>
            </div>
            <div className="flex items-center justify-between">
            <div className="tag-based-expense-amount text-zinc-300 text-xl font-thin">₹ {tagAmount}</div>
            <div className="about-month flex items-center gap-4 font-thin">
                <div>This month</div>
                <ArrowComponent
                    className={
                        tagStatus === "HiTrendingDown"
                            ? "descending-arrow"
                            : "ascending-arrow"
                    }
                />
            </div>
            </div>
        </div>
    );
}

export default TagCard;
