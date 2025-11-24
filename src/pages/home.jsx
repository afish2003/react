import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="app" style={{ padding: "2rem" }}>
            <h1>The Useless React Arcade 🎪🎮</h1>
            <p>Choose a pointless experience:</p>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
                <li style={{ marginBottom: "1rem" }}>
                    <Link to="/chaosButton" className="menu-link">
                        🔴 The Completely Useless Chaos Button
                    </Link>
                </li>

                {/* More games coming soon! */}
            </ul>
        </div>
    );
}