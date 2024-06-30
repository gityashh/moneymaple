import React, { useState, useEffect, useMemo } from "react";
import { IoSend } from "react-icons/io5";
import { HiMicrophone } from "react-icons/hi";

function AIInput() {
    const [inputValue, setInputValue] = useState("");
    const [isListening, setIsListening] = useState(false);

    const recognition = useMemo(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        return recog;
    }, []);

    useEffect(() => {
        recognition.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            setInputValue(transcript);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    }, [recognition]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleMicrophoneClick = () => {
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="flex items-start w-full gap-2">
            <textarea
                type="text"
                name="aiinput"
                id="ai"
                placeholder="type your conversation here..."
                className="bg-zinc-800 h-20 text-zinc-200 w-[80%]"
                value={inputValue}
                onChange={handleInputChange}
            />
            <div className="flex gap-2">
                <button className="w-32 px-16 py-8 rounded-md  bg-[#78E89E]">
                    <IoSend />
                </button>
                <button
                    className={`microphone-button ${
                        isListening ? "listening" : ""
                    } w-32 px-12 py-8 bg-zinc-600 rounded-md `}
                    onClick={handleMicrophoneClick}
                >
                    <HiMicrophone/>
                </button>
            </div>
        </div>
    );
}

export default AIInput;
