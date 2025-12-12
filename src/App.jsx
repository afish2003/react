import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import ChaosButton from "./pages/chaosButton.jsx";
import FakeScanner from "./pages/fakeScanner.jsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chaosButton" element={<ChaosButton />} />
                <Route path="/fakeScanner" element={<FakeScanner />} />
            </Routes>
        </HashRouter>
    );
}