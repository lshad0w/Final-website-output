import { model } from "./mainmodule.js";
//Start of modal functions
const modal = document.getElementById("system-modal");
const yesButton = document.getElementById("confirm-yes");
const noButton = document.getElementById("confirm-no");

function showModal() {
    modal.style.visibility = "visible";
    modal.style.opacity = "1";
}

function closeModal() {
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.visibility = "hidden";
    }, 300);
}

yesButton.addEventListener("click", closeModal);
window.onload = showModal;
// End of modal functions


const chatInput = document.querySelector("#user-input"); // Fixed ID reference
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector("#chat-messages");
const exampleQuestionsContainer = document.querySelector(".example-questions");

//Button for sending your prompt
document.addEventListener("DOMContentLoaded", () => {
    const exampleButtons = document.querySelectorAll(".example-questions button");

    exampleButtons.forEach((button) => {
        button.addEventListener("click", () => sendMessage(button.textContent));
    });
});


//Chat history array, to make current chat session progressive
let chatHistory = JSON.parse(sessionStorage.getItem("chatHistory")) || [];


// Function to send a user message
const sendMessage = (userText) => {
    console.log("Send button clicked, user text:", userText);

    if (!userText.trim()) return; // Prevent empty messages

    if (exampleQuestionsContainer) {
        exampleQuestionsContainer.style.display = "none";
    }

    // Save user message in history
    chatHistory.push({ role: "user", content: userText });
    sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory)); // Save updated history

    if (userText.toLowerCase().includes("what was my first prompt")) {
        if (chatHistory.length > 1) {
            appendMessage(
                `Ah, yes. Your first prompt was: "${chatHistory[0].content}". A bit meta, wouldn't you say?`,
                "bot-message"
            );
        } else {
            appendMessage("I don't seem to recall a first prompt. Did you even start yet?", "bot-message");
        }
        return;
    }

    chatInput.value = "";
    getChatResponse(userText);
};

// Function to handle chat response from AI
const getChatResponse = async (userText) => {
    console.log("User input:", userText);

    // Append user message with icon
    appendMessage(userText, "user-message", "../images/user-icon.jpg");//user image path

    //Bot message placeholder
    const botPlaceholder = document.createElement("div");
    botPlaceholder.classList.add("chat-message", "bot-message");

    const botIcon = document.createElement("img");
    botIcon.src = "../images/drippywoo-drippy.jpg";//Chatbot's image path
    botIcon.alt = "Chat Icon";
    botIcon.classList.add("chat-icon");

    const botBubble = document.createElement("div");
    botBubble.classList.add("chat-bubble", "bot-message");
    botBubble.innerHTML = `<div class="chat-body-inner left"><p>...</p></div>`; // Loading text

    botPlaceholder.appendChild(botIcon);
    botPlaceholder.appendChild(botBubble);
    chatContainer.appendChild(botPlaceholder);
    scrollToBottom();

    try {
        // Format the conversation history into a single string
        let formattedHistory = chatHistory.map(entry => `${entry.role}: ${entry.content}`).join("\n");

        // Send formatted history along with the new user input
        const result = await model.generateContent(`${formattedHistory}\nUser: ${userText}\nAssistant:`);

        console.log("Gemini raw response:", result);

        const responseText = await result.response.text();
        console.log("Gemini response in text form:", responseText);

        // Format response for better readability
        const formattedText = formatResponse(responseText);
        botBubble.innerHTML = `<div class="chat-body-inner left">${formattedText}</div>`;

        // Save bot response in chat history
        chatHistory.push({ role: "assistant", content: formattedText });
        sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    } catch (error) {
        console.error("Error fetching Gemini response:", error);
        botBubble.innerHTML = `<div class="chat-body-inner left error-message"><p>[System Alert] Unable to retrieve response. Try again later.</p></div>`;
    }

    scrollToBottom();
};



// Function to format AI response with line breaks for better readability
const formatResponse = (text) => {
    return text
        .replace(/\[System (.*?)\]/g, '<strong>[$1]</strong>') 
        .replace(/(Task \d+:)/g, '<br><strong>$1</strong>') 
        .replace(/(Mission:|Reward:)/g, '<br><strong>$1</strong>') 
        .replace(/\n/g, '<br>');
};

// Function to append a message with an icon
const appendMessage = (text, className, iconSrc) => {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("chat-message", className);

    const iconImg = document.createElement("img");
    iconImg.src = iconSrc;
    iconImg.alt = "Chat Icon";
    iconImg.classList.add("chat-icon");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-bubble", className);
    messageDiv.innerHTML = `
        <div class="chat-body-inner ${className === "user-message" ? "right" : "left"}">
            <p>${text}</p>
        </div>
    `;

    // Append elements based on message type
    if (className === "user-message") {
        messageWrapper.appendChild(messageDiv); // Message first
        messageWrapper.appendChild(iconImg); // Icon on the right
    } else {
        messageWrapper.appendChild(iconImg); // Icon on the left
        messageWrapper.appendChild(messageDiv); // Message after
    }

    chatContainer.appendChild(messageWrapper);
    scrollToBottom();
};


// Function to scroll to the latest message
const scrollToBottom = () => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
};





// Event listeners for sending messages
sendButton.addEventListener("click", () => sendMessage(chatInput.value));

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { 
        e.preventDefault();
        sendMessage(chatInput.value);
    }
});

// Function to restore chat history on page load
const restoreChatHistory = () => {
    sessionStorage.removeItem("chatHistory");
    chatHistory = [];

    chatHistory.forEach(({ role, content }) => {
        appendMessage(content, role === "user" ? "user-message" : "bot-message");
    });
};
restoreChatHistory();



