import { useState } from "react"; /* Allows components to retain memory */

export default function ChaosButton() {

    // State Variables
    const [clicks, setClicks] = useState(0);
    const [bgColor, setBgColor] = useState("#020617");
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);
    const [message, setMessage] = useState("Click the button. You know you want to.");
    const [emojiBurst, setEmojiBurst] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

    // Chaos Level
    const chaosLevel = Math.min(Math.floor(clicks / 5), 5);

    // Arrays
    const colors = [
        "#ddff00", "#1e293b", "#4c1d95", "#b91c1c", "#166534",
        "#0e7490", "#ff8800", "#ff00af", "#5cff00", "#facc15"
    ];

    const messages = [
        "Congrats, you just accomplished absolutely nothing.",
        "IQ -10.",
        "Somewhere, a CPU sighed.",
        "Your GPA just dropped by 0.001.",
        "Achievement unlocked: Bad decisions.",
        "The button is judging you.",
        "Clicking is not a personality trait.",
        "You could be doing homework right now.",
        "This is why we can’t have nice things.",
        "You clicked. Again. Wow."
    ];

    const mediumAngryMessages = [
        "Stop. Seriously.",
        "This is getting out of hand.",
        "You're ruining everything.",
        "My circuits are overheating.",
        "I am not built for this!",
    ];

    const fullRageMessages = [
        "ENOUGH.",
        "STOP CLICKING ME.",
        "I SWEAR TO GOD—",
        "WHY ARE YOU LIKE THIS?",
        "YOU'RE BREAKING REALITY.",
        "I CAN’T TAKE THIS ANYMORE.",
    ];

    const emojis = ["😈", "🔥", "💥", "🤡", "🌀", "🧠", "😵‍💫", "🫠", "🤯", "👀"];

    // Helper Functions
    function getRandomFrom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Chaos Engine
    function chaosEngine() {

        setClicks((prev) => prev + 1);

        const intensity = chaosLevel + 1;

        setBgColor(getRandomFrom(colors));
        setRotation((Math.random() - 0.5) * 30 * intensity);
        setScale(0.7 + Math.random() * (1.1 * intensity));

        setMessage(
            chaosLevel < 2
                ? getRandomFrom(messages)
                : chaosLevel < 4
                    ? getRandomFrom(mediumAngryMessages)
                    : getRandomFrom(fullRageMessages)
        );

        const baseEmoji = getRandomFrom(emojis);
        const amount = 5 + Math.floor(Math.random() * 10 * intensity);
        setEmojiBurst(baseEmoji.repeat(amount));

        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 100 + (200 / intensity));

        setButtonOffset({
            x: (Math.random() * 120 - 60) * intensity,
            y: (Math.random() * 80 - 40) * intensity,
        });

        if (clicks > 15 && Math.random() < (chaosLevel + 1) * 0.05) {
            const mildAlerts = [
                "Please stop clicking.",
                "Why are you still doing this?",
                "Okay, that’s enough.",
                "You can stop now.",
                "This isn't productive."
            ];

            const angryAlerts = [
                "SERIOUSLY. WHAT ARE YOU DOING.",
                "STOP. NOW.",
                "I am BEGGING you to stop.",
                "What part of STOP don’t you understand?",
                "You're pushing it."
            ];

            const rageAlerts = [
                "I SAID STOP. THIS ISN’T FUN ANYMORE.",
                "ENOUGH!",
                "I’M LOSING MY MIND.",
                "YOU’RE BREAKING EVERYTHING.",
                "WHY ARE YOU LIKE THIS?"
            ];

            const alertsToUse =
                chaosLevel < 3 ? mildAlerts :
                chaosLevel < 5 ? angryAlerts :
                rageAlerts;

            alert(getRandomFrom(alertsToUse));
        }
    }

    // Styles
    const containerStyle = {
        backgroundColor: bgColor,
        transform: `rotate(${rotation}deg)`,
        transition: "background-color 0.3s ease, transform 0.2s ease",
    };

    const buttonStyle = {
        transform: `scale(${scale})`,
        position: "relative",
        left: `${buttonOffset.x}px`,
        top: `${buttonOffset.y}px`,
        transition: "transform 0.2s ease, left 0.2s ease, top 0.2s ease",
    };

    // Return JSX
    return (
        <div
            className={`app 
              ${isShaking ? "shake" : ""} 
              ${chaosLevel > 4 ? "rage" : ""} 
              ${chaosLevel === 5 ? "chaos-flash" : ""}`}
            style={containerStyle}
        >
            <h1 className="title">The Completely Useless Chaos Button</h1>
            <p className="subtitle">Clicks wasted: {clicks}</p>

            <button className="chaos-button" style={buttonStyle} onClick={chaosEngine}>
                Do Not Click
            </button>

            <p className="message">{message}</p>

            <div className="emoji-burst">{emojiBurst}</div>
        </div>
    );
}