import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import ChaosButton from "./pages/chaosButton.jsx";

export default function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chaosButton" element={<ChaosButton />} />
            </Routes>
        </HashRouter>
    );
}