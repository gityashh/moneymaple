import React from "react";

function ConversationCard({ isAI, text }) {
    return (
        <div
            className={`converation-card ${
                isAI ? "ai-conversation-card" : "user-conversation-card"
            }`}
        >
            <span className={isAI ? "ai-label" : "user-label"}>
                {isAI ? "AI" : "You"}
            </span>
            <br></br>
            {text}
        </div>
    );
}

export default ConversationCard;
