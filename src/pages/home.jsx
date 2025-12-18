import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="app" style={{ padding: "2rem" }}>
            <h1>The Useless React Arcade 🎪🎮</h1>
            <p className="site-intro">
              This is the Useless React Arcade — a collection of intentionally dumb,
              interactive mini-projects I built while learning React.
            </p>

            <p className="site-audience">
              It’s mainly for classmates and instructors, but also for anyone who likes
              weird websites and broken-on-purpose interfaces.
            </p>

            <p>Choose a questionable experience:</p>

            <ul style={{ listStyle: "none", padding: 0, marginTop: "1.5rem" }}>
                <li style={{ marginBottom: "1rem" }}>
                    <Link to="/chaosButton" className="menu-link">
                        🔴 The Completely Useless Chaos Button
                    </Link>
                </li>
                <li style={{ marginBottom: "1rem" }}>
                    <Link to="/fakeScanner" className="menu-link">
                        🦠 Virus Scanner
                    </Link>
                </li>

                {/* More games coming soon! */}
            </ul>

            <hr style={{ margin: "3rem 0" }} />

            <section className="site-meta">
              <h2>About This Project</h2>
              <p>
                I made this site as part of a class project focused on interactive and
                animated web design. Instead of building something useful, I leaned into
                humor to experiment with React state, timing, animations, and user interaction.
              </p>

              <h3>AI Disclosure</h3>
              <p>
                I used AI tools at certain points to help debug issues, think through
                solutions, clean up code, and expose accessibility issues. Everything here was reviewed, edited, and
                intentionally put together by me.
              </p>

              <h3>License</h3>
              <p>
                <a href="https://afish2003.github.io/fish-fry/">Fish-Fry</a>
                by{" "}
                <a href="https://afish2003.github.io/fish-fry/">Alexander C. Fisher</a>
                {" "}is licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="license noopener noreferrer"
                >
                  CC BY-NC-SA 4.0
                </a>.
              </p>
            </section>
        </div>
    );
}