const questions = [
    {
        question: "Is the person below 18 years of age?",
        options: [
            { text: "Yes", nextIndex: 2, image: "images/p3_5.png", audio: "audio/Suicide Mickey.avi.mp3" },
            { text: "No", nextIndex: 1, image: "images/p1.png", audio: "audio/incredible.mp3" }
        ]
    },
    {
        question: "Does the person have a physical or mental disability or condition?",
        options: [
            { text: "Yes", nextIndex: 2, image: "images/p3_5.png", audio: "audio/Suicide Mickey.avi.mp3" },
            { text: "No", result: "not_applicable" }
        ]
    },
    {
        question: "Is the person experiencing physical or psychological harm (e.g., beating, emotional abuse)?",
        options: [
            { text: "Yes", nextIndex: 13, image: "images/p9.png", audio: "audio/Sonic.mp3" },  // Corrected to index 13
            { text: "No", nextIndex: 3, image: "images/p3.png", audio: "audio/Sneaky Adventure.mp3" }
        ]
    },
    {
        question: "Is the person subjected to degrading treatment (e.g., humiliation, forced begging)?",
        options: [
            { text: "Yes", nextIndex: 14, image: "images/p9.png", audio: "audio/Sonic.mp3" },  // Corrected to index 14
            { text: "No", nextIndex: 4, image: "images/g1.png", audio: "audio/sakamoto.mp3" }
        ]
    },
    {
        question: "Is the person being deprived of basic needs (e.g., food, shelter, education)?",
        options: [
            { text: "Yes", nextIndex: 15, image: "images/p9.png", audio: "audio/Sonic.mp3" },  // Corrected to index 15
            { text: "No", nextIndex: 5, image: "images/g2.png", audio: "audio/godzilla.mp3" }
        ]
    },
    {
        question: "Is the person a victim of medical neglect (e.g., denial of treatment for serious injuries or illness)?",
        options: [
            { text: "Yes", nextIndex: 16, image: "images/p9.png", audio: "audio/Sonic.mp3" },  // Corrected to index 16
            { text: "No", nextIndex: 6, image: "images/g3.png", audio: "audio/punk.mp3" }
        ]
    },
    {
        question: "Is the person engaging in sexual intercourse or lascivious conduct?",
        options: [
            { text: "Yes", nextIndex: 7, image: "images/p9.png", audio: "audio/Sonic.mp3" },
            { text: "No", nextIndex: 8, image: "images/g4.png", audio: "audio/thor.mp3" }
        ]
    },
    {
        question: "Is the person being coerced, influenced, or induced by an adult, group, or syndicate?",
        options: [
            { text: "Yes", nextIndex: 17, image: "images/p4.png", audio: "audio/hell.mp3" },
            { text: "No", result: "other_law" }
        ]
    },
    {
        question: "Is the person being traded, sold, or dealt for money/profit/barter?",
        options: [
            { text: "Yes", nextIndex: 18, image: "images/p9.png", audio: "audio/Sonic.mp3" },
            { text: "No", nextIndex: 9, image: "images/g9.png", audio: "audio/undead.mp3" }
        ]
    },
    {
        question: "Was the person hurt, abused, or treated cruelly in a way that affects their well-being?",
        options: [
            { text: "Yes", nextIndex: 19, image: "images/p9.png", audio: "audio/Sonic.mp3" },
            { text: "No", nextIndex: 10, image: "images/g5.png", audio: "audio/doom.mp3" }
        ]
    },
    {
        question: "Was the person found in a hotel, motel, bar, or resort with a non-relative adult?",
        options: [
            { text: "Yes", nextIndex: 20, image: "images/p9.png", audio: "audio/Sonic.mp3" },
            { text: "No", nextIndex: 11, image: "images/g6.png", audio: "audio/doom2.mp3" }
        ]
    },
    {
        question: "Was the person given/delivered/offered to someone who shouldn't be with",
        options: [
            { text: "Yes", nextIndex: 21, image: "images/p9.png", audio: "audio/Sonic.mp3" },
            { text: "No", nextIndex: 12, image: "images/g7.png", audio: "audio/heart.mp3" }
        ]
    },
    {
        question: "Was the person taken to a hotel/motel by someone, and the staff allowed it?",
        options: [
            { text: "Yes", nextIndex: 22, image: "images/p9.png", audio: "audio/Sonic.mp3" },
            { text: "No", result: "end" }
        ]
    },

    // Age checks for correct paths
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse" }, { text: "No", result: "child_abuse_1" } ] },   // Index 13
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse" }, { text: "No", result: "child_abuse_1" } ] },   // Index 14
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse" }, { text: "No", result: "child_abuse_1" } ] },   // Index 15
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse" }, { text: "No", result: "child_abuse_1" } ] },   // Index 16
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_prostitution" }, { text: "No", result: "child_prostitution" } ] },  // Index 17
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_trafficking" }, { text: "No", result: "child_trafficking" } ] },    // Index 18
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse_2" }, { text: "No", result: "child_abuse_2" } ] },          // Index 19
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse_3" }, { text: "No", result: "child_abuse_3" } ] },          // Index 20
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse_4" }, { text: "No", result: "child_abuse_4" } ] },          // Index 21
    { question: "Is the person under 12 years old?", options: [ { text: "Yes", result: "worse_abuse_5" }, { text: "No", result: "child_abuse_5" } ] }           // Index 22
];


const penalties = {
    "child_abuse_1": {
        label: "Victim of Child Abuse",
        info: "Penalty: Prisión mayor (6 years and 1 day to 8 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_abuse": {
        label: "Victim of Child Abuse (Under 12)",
        info: "Penalty: Prisión mayor in its medium to maximum period (8 to 12 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "statutory_rape": {
        label: "Victim of Child Prostitution (Statutory Rape)",
        info: "Penalty: Reclusion perpetua (20 to 40 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "child_prostitution": {
        label: "Victim of Child Prostitution",
        info: "Penalty: Reclusion temporal to reclusion perpetua (14 years, 8 months to 40 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_prostitution": {
        label: "Victim of Child Prostitution (Under 12)",
        info: "Penalty: Reclusion perpetua (20 to 40 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "child_trafficking": {
        label: "Victim of Child Trafficking",
        info: "Penalty: Reclusion temporal to reclusion perpetua (14 years, 8 months to 40 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_trafficking": {
        label: "Victim of Child Trafficking (Under 12)",
        info: "Penalty: Reclusion perpetua (20 to 40 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "indecent_show": {
        label: "Victim of Obscene Publications and Indecent Shows",
        info: "Penalty: Prisión mayor (6 years and 1 day to 8 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_indecent": {
        label: "Victim of Obscene Publications and Indecent Shows (Under 12)",
        info: "Penalty: Prisión mayor in its maximum period (8 to 12 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "child_abuse_2": {
        label: "Victim of Child Abuse",
        info: "Penalty: Prisión mayor (6 years and 1 day to 12 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_abuse_2": {
        label: "Victim of Child Abuse (Under 12)",
        info: "Penalty: Prisión mayor in its maximum period (12 to 20 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "child_abuse_3": {
        label: "Victim of Child Abuse (Hotel, non-relative)",
        info: "Penalty: Prisión mayor (12 to 20 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_abuse_3": {
        label: "Victim of Child Abuse (Hotel, non-relative, under 12)",
        info: "Penalty: Reclusion temporal (14 years, 8 months to 20 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "child_abuse_4": {
        label: "Victim of Child Abuse (Child offered to others)",
        info: "Penalty: Prisión mayor (6 years and 1 day to 8 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_abuse_4": {
        label: "Victim of Child Abuse (Child offered, under 12)",
        info: "Penalty: Prisión mayor in its maximum period (8 to 12 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "child_abuse_5": {
        label: "Victim of Child Abuse (Staff allowed hotel access)",
        info: "Penalty: Prisión mayor (6 years and 1 day to 8 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "worse_abuse_5": {
        label: "Victim of Child Abuse (Staff allowed hotel access, under 12)",
        info: "Penalty: Prisión mayor in its maximum period (8 to 12 years)",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "other_law": {
        label: "Possible Violation of Other Laws",
        info: "No valid consent exists for minors. Possible statutory rape.",
        image: "images/p10.png",
        audio: "audio/caretaker.mp3"
    },
    "not_applicable": {
        label: "Not Applicable",
        info: "RA 7610 protections do not apply in this context.",
        image: "images/g1.png",
        audio: "audio/sakamoto.mp3"
    },
    "end": {
        label: "Assessment Complete",
        info: "No violation identified under this path.",
        image: "images/g8.png",
        audio: "audio/lord.mp3"
    }
};



        let currentQuestionIndex = 0;

        const questionElement = document.getElementById("question");
        const questionContainer = document.getElementById("questionContainer");
        const optionElement = document.getElementById("options");
        const resultElement = document.getElementById("result");
        const penaltyDetailsElement = document.getElementById("penaltyDetails");
        const restartButton = document.getElementById("restart");

        function displayQuestion() {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.innerText = currentQuestion.question;
            optionElement.innerHTML = "";

            currentQuestion.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option.text;
                button.onclick = () => {
                    if (option.nextIndex !== undefined) {
                        currentQuestionIndex = option.nextIndex;
                        displayQuestion();
                    } else {
                        displayResult(option.result);
                    }
                };
                optionElement.appendChild(button);
            });
        }

        function displayResult(resultType) {
            questionContainer.classList.add("hidden");
            resultElement.classList.remove("hidden");
            restartButton.classList.remove("hidden");

            const penalty = penalties[resultType];
            penaltyDetailsElement.innerHTML = `
                <h3>${penalty.label}</h3>
                <p>${penalty.info}</p>
            `;

            // Set image if available
            if (penalty.image) {
                questionImage.src = penalty.image;
            } else {
                questionImage.src = ""; // fallback image if needed
            }

            // Play audio if available
            if (penalty.audio) {
                optionAudio.src = penalty.audio;
                optionAudio.volume = 0.5; // optional: lower volume
                optionAudio.play();
            }
        }

       function restartSystem() {
            currentQuestionIndex = 0;
            questionContainer.classList.remove("hidden");
            resultElement.classList.add("hidden");
            restartButton.classList.add("hidden");

            // Reset image
            questionImage.src = "images/p3.png"; // or any default image you'd like

            // Play restart audio
            optionAudio.src = "audio/Sneaky Adventure.mp3";

            displayQuestion();
        }


        displayQuestion();

    const questionImage = document.getElementById("questionImage");

    function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            if(option.image) {
                questionImage.src = option.image;
            }
            if(option.audio) {
                optionAudio.src = option.audio;
                optionAudio.play();
            }

            if (option.nextIndex !== undefined) {
                currentQuestionIndex = option.nextIndex;
                displayQuestion();
            } else {
                displayResult(option.result);
            }
        };
        optionElement.appendChild(button);
    });
}

