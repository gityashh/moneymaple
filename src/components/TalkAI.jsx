import React from "react";
import AIInput from "./TalkAI/AIInput";
import Conversations from "./TalkAI/Conversations";

function TalkAI() {
    return (
        <div className="w-full h-screen px-20 pl-[400px] py-4 flex flex-col justify-between">
            <Conversations className="talkai-chat-container" />
            <AIInput />
        </div>
    );
}

export default TalkAI;
