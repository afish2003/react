import { useState } from "react";

function getRandomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const virusNames = [
    "Trojan.MildInconvenience",
    "Worm.SpicyNoodle",
    "Backdoor.WiFiStealer",
    "Malware.SadLaptop",
    "Spyware.YourMom",
    "Rootkit.FerretEscape",
    "Adware.ObnoxiousPopups",
    "Cryptominer.ToastHeater",
    "Virus.ClownShoes",
];

const progressMessages = [
    "Decrypting noodles…",
    "Overclocking flux capacitor…",
    "Reticulating splines…",
    "Analyzing emotional state…",
    "Uninstalling common sense…",
    "Rebooting your bad decisions…",
];

const popupLines1 = [
    "YOUR TOASTER IS NOW SENTIENT.",
    "YOUR RAM IS LEAKING SPAGHETTI.",
    "YOUR PRINTER JUST SUBSCRIBED TO 3 NEWSLETTERS.",
];

const popupLines2 = [
    "RECOMMENDED ACTION: PANIC.",
    "STATUS: IRREPARABLE.",
    "FIXED: 0, MADE WORSE: 27.",
    "SOLUTION: TURN IT OFF AND CRY.",
];

const rainEmojis = ["🦠", "🤢", "😡", "💥", "🤖", "🫠", "😱", "🔥"];

const popupSounds = [
    "/sounds/windowsErrorMix.mp3",
    "/sounds/msdosError.mp3",
    "/sounds/birdScream.mp3",
];

const scanSounds = [
    "/sounds/msdosError.mp3"
];

let scanAudio = null;

let lastSoundTime = 0;

function playRandomSound(volume = 0.6) {
    const now = Date.now();

    // prevent rapid-fire sound spam
    if (now - lastSoundTime < 250) return;
    lastSoundTime = now;

    const src = popupSounds[Math.floor(Math.random() * popupSounds.length)];
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.volume = volume;

    audio.play().catch(() => {});
}

function playScanLoop() {
    if (scanAudio) return;

    const src = scanSounds[Math.floor(Math.random() * scanSounds.length)];
    scanAudio = new Audio(src);
    scanAudio.volume = 0.4;
    scanAudio.loop = true;
    scanAudio.play().catch(() => {});
}

function stopScanLoop() {
    if (!scanAudio) return;
    scanAudio.pause();
    scanAudio.currentTime = 0;
    scanAudio = null;
}

export default function FakeScanner() {
    const [progress, setProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);
    const [popups, setPopups] = useState([]);
    const [rain, setRain] = useState([]);
    const [statusMessage, setStatusMessage] = useState("Ready to ruin your day.");
    const [meltdown, setMeltdown] = useState(false);

    function spawnPopup() {
        const popup = {
            id: Math.random().toString(36).slice(2),
            line1: getRandomFrom(popupLines1),
            line2: getRandomFrom(popupLines2),
            x: Math.floor(Math.random() * 60) + 10, // vw
            y: Math.floor(Math.random() * 50) + 10, // vh
        };
        setPopups((prev) => [...prev, popup]);
        playRandomSound();
    }

    function closePopup(id) {
        setPopups((prev) => prev.filter((p) => p.id !== id));
        playRandomSound();
        spawnPopup(); // immediately open a new popup after closing one
    }

    function spawnEmoji() {
        const item = {
            id: Math.random().toString(36).slice(2),
            emoji: getRandomFrom(rainEmojis),
            left: Math.floor(Math.random() * 100),
            duration: 3 + Math.random() * 2,
        };
        setRain((prev) => [...prev, item]);
        setTimeout(() => {
            setRain((prev) => prev.filter((e) => e.id !== item.id));
        }, item.duration * 1000);
    }

    function triggerMeltdown() {
        stopScanLoop();
        setMeltdown(true);
        playRandomSound(1);
    }

    function startScan() {
        if (isScanning) return;

        setIsScanning(true);
        setProgress(0);
        setResults(null);
        setPopups([]);
        setRain([]);
        setMeltdown(false);
        setStatusMessage("Initializing fake security protocols…");
        playScanLoop();

        let current = 0;

        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 12) + 5;
            if (current > 100) current = 100;
            setProgress(current);

            setStatusMessage(getRandomFrom(progressMessages));

            if (Math.random() < 0.4) spawnPopup();
            if (Math.random() < 0.6) spawnEmoji();

            if (current === 100) {
                clearInterval(interval);

                const found = [];
                const count = Math.floor(Math.random() * 6) + 3; // 3–8
                for (let i = 0; i < count; i++) {
                    found.push(getRandomFrom(virusNames));
                }

                setTimeout(() => {
                    stopScanLoop();
                    setResults(found);
                    setIsScanning(false);
                    setStatusMessage("Scan complete. Everything is definitely worse now.");
                    playRandomSound();
                    if (found.length > 6) {
                        triggerMeltdown();
                    }
                }, 600);
            }
        }, 350);
    }

    function resetAfterMeltdown() {
        setMeltdown(false);
        setResults(null);
        setProgress(0);
        setStatusMessage("System barely holding together. Scan again?");
        setPopups([]);
        setRain([]);
    }

    return (
        <div className="app scanner-page">
            <div className="scanner-crt"></div>
            <h1>Fake Antivirus Scanner 3000</h1>
            <p className="scanner-status">{statusMessage}</p>

            {!isScanning && (
                <button className="scan-button" onClick={startScan}>
                    {progress === 0 ? "Start Scan" : "Scan Again (Bad Idea)"}
                </button>
            )}

            {(isScanning || progress > 0) && (
                <div className="progress-area">
                    <p>Scanning... {progress}%</p>
                    <div className="progress-bar">
                        <div className="fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            )}

            {results && !meltdown && (
                <div className="results-area">
                    <h2>Scan Complete</h2>
                    <p>We found {results.length} extremely questionable items:</p>
                    <ul>
                        {results.map((v, i) => (
                            <li key={i}>🦠 {v}</li>
                        ))}
                    </ul>
                    <p className="danger">
                        ⚠️ Recommended Action: Panic. Or click scan again. Both are wrong.
                    </p>
                </div>
            )}

            {/* Pop-up virus warnings */}
            {popups.map((p) => (
                <div
                    key={p.id}
                    className="scanner-popup"
                    style={{ top: `${p.y}vh`, left: `${p.x}vw` }}
                >
                    <div className="scanner-popup-header">
                        💥 CRITICAL FAILURE 💥
                    </div>
                    <div className="scanner-popup-body">
                        <p>{p.line1}</p>
                        <p>{p.line2}</p>
                    </div>
                    <button
                        className="scanner-popup-button"
                        onClick={() => closePopup(p.id)}
                    >
                        {Math.random() < 0.5 ? "PANIC" : "LOL OK"}
                    </button>
                </div>
            ))}

            {/* Emoji rain */}
            {rain.map((e) => (
                <div
                    key={e.id}
                    className="scanner-emoji-rain"
                    style={{
                        left: `${e.left}vw`,
                        animationDuration: `${e.duration}s`,
                    }}
                >
                    {e.emoji}
                </div>
            ))}

            {/* Meltdown overlay */}
            {meltdown && (
                <div className="scanner-meltdown-overlay">
                    <div className="scanner-meltdown-box">
                        <h2>💥 CRITICAL FAILURE 💥</h2>
                        <p>YOUR EMOTIONAL SUPPORT HARD DRIVE IS COMPROMISED.</p>
                        <div className="scanner-meltdown-buttons">
                            <button onClick={resetAfterMeltdown}>PANIC</button>
                            <button onClick={resetAfterMeltdown}>LOL OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}