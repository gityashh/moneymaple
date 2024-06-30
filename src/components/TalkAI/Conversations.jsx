import React from "react";
import ConversationCard from "./ConversationCard";

function Conversations() {
    return (
        <div className="conversation-container">
            <ConversationCard
                isAI={false}
                text="How can I invest more and more and achieve financial success?"
            />
            <ConversationCard
                isAI={true}
                text="Achieving financial success through investing involves a combination of strategies, careful planning, and disciplined execution."
            />
        </div>
    );
}

export default Conversations;
