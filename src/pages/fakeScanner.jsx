import { useState } from "react";

let audioUnlocked = false;

function unlockAudio() {
    if (audioUnlocked) return;

    const testAudio = new Audio("./sounds/msdosError.mp3");
    testAudio.volume = 0;
    testAudio.play().catch(() => {});
    audioUnlocked = true;
}

let lastSoundTime = 0;

let activeAudio = null;

function playRandomSound(volume = 0.6) {
    const now = Date.now();

    // prevent rapid-fire sound spam
    if (now - lastSoundTime < 250) return;
    lastSoundTime = now;

    const popupSounds = [
        "./sounds/windowsErrorMix.mp3",
        "./sounds/msdosError.mp3",
        "./sounds/birdScream.mp3",
    ];

    const src = popupSounds[Math.floor(Math.random() * popupSounds.length)];
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.currentTime = 0;
    }
    const audio = new Audio(src);
    activeAudio = audio;
    audio.currentTime = 0;
    audio.volume = volume;

    audio.play().catch(() => {});
}

function getRandomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function glitchText(text, intensity = 0.15) {
    const chars = "!@#$%^&*()_+=-[]{};:<>?/\\|~";
    return text
        .split("")
        .map((ch) =>
            Math.random() < intensity && ch !== " "
                ? chars[Math.floor(Math.random() * chars.length)]
                : ch
        )
        .join("");
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
    "Poking around files that begged us not to look…",
    "Rearranging your desktop icons emotionally…",
    "Asking your laptop how it *feels* today…",
    "Googling ‘how to remove a curse from a hard drive’…",
    "Cross-referencing vibes with known malware…",
    "Running diagnostics on your life choices…",
];

export default function FakeScanner() {
    const [progress, setProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Standing by. Judging silently.");
    const [meltdown, setMeltdown] = useState(false);
    const [glitching, setGlitching] = useState(false);

    function startScan() {
        if (isScanning) return;

        setIsScanning(true);
        setProgress(0);
        setResults(null);
        setMeltdown(false);
        setStatusMessage("Booting extremely real, very serious security engine…");

        let current = 0;

        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 12) + 5;
            if (current > 100) current = 100;
            setProgress(current);

            setStatusMessage(getRandomFrom(progressMessages));

            if (current === 100) {
                clearInterval(interval);

                setTimeout(() => {
                    setIsScanning(false);
                    setStatusMessage("Scan complete. This machine has seen things.");
                    setMeltdown(true);
                    setGlitching(true);
                    setTimeout(() => setGlitching(false), 1200);
                    playRandomSound(1);
                }, 600);
            }
        }, 350);
    }

    function resetAfterMeltdown() {
        setGlitching(false);
        if (activeAudio) {
            activeAudio.pause();
            activeAudio.currentTime = 0;
            activeAudio = null;
        }
        setMeltdown(false);
        setResults(null);
        setProgress(0);
        setStatusMessage("System stable* (*definition of ‘stable’ may vary).");
    }

    return (
        <div className="app scanner-page">
            <div className="scanner-crt"></div>
            <h1>Fake Antivirus Scanner 3000</h1>
            <p className="scanner-status">{statusMessage}</p>

            {!isScanning && (
                <button
                    className="scan-button"
                    onClick={() => {
                        unlockAudio();
                        startScan();
                    }}
                >
                    {progress === 0 ? "Scan Anyway" : "Scan Again (Absolutely Worse Idea)"}
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

            {/* Meltdown overlay */}
            {meltdown && (
                <div className="scanner-meltdown-overlay glitch-effect">
                    <div className="scanner-meltdown-box">
                        <h2>💥 SYSTEM HAS MADE A DECISION 💥</h2>
                        <p>
                            {glitching
                                ? glitchText(
                                      "Your computer has decided to stop cooperating for personal reasons.",
                                      0.25
                                  )
                                : "Your computer has decided to stop cooperating for personal reasons."}
                        </p>
                        <div className="scanner-meltdown-buttons">
                            <button
                                onClick={() => {
                                    playRandomSound();
                                    resetAfterMeltdown();
                                }}
                            >
                                SCREAM INTERNALLY
                            </button>
                            <button
                                onClick={() => {
                                    playRandomSound();
                                    resetAfterMeltdown();
                                }}
                            >
                                ACCEPT MY FATE
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}