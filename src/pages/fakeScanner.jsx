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
    const audio = new Audio(src);
    audio.currentTime = 0;
    audio.volume = volume;

    audio.play().catch(() => {});
}

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

export default function FakeScanner() {
    const [progress, setProgress] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);
    const [statusMessage, setStatusMessage] = useState("Ready to ruin your day.");
    const [meltdown, setMeltdown] = useState(false);

    function startScan() {
        if (isScanning) return;

        setIsScanning(true);
        setProgress(0);
        setResults(null);
        setMeltdown(false);
        setStatusMessage("Initializing fake security protocols…");

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
                    setStatusMessage("Scan complete. Everything is definitely worse now.");
                    setMeltdown(true);
                    playRandomSound(1);
                }, 600);
            }
        }, 350);
    }

    function resetAfterMeltdown() {
        setMeltdown(false);
        setResults(null);
        setProgress(0);
        setStatusMessage("System barely holding together. Scan again?");
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

            {/* Meltdown overlay */}
            {meltdown && (
                <div className="scanner-meltdown-overlay glitch-effect">
                    <div className="scanner-meltdown-box">
                        <h2>💥 CRITICAL FAILURE 💥</h2>
                        <p>YOUR EMOTIONAL SUPPORT HARD DRIVE IS COMPROMISED.</p>
                        <div className="scanner-meltdown-buttons">
                            <button
                                onClick={() => {
                                    playRandomSound();
                                    resetAfterMeltdown();
                                }}
                            >
                                PANIC
                            </button>
                            <button
                                onClick={() => {
                                    playRandomSound();
                                    resetAfterMeltdown();
                                }}
                            >
                                LOL OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}