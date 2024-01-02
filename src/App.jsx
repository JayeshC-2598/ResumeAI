import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Welcome from "./components/Welcome/Welcome";
import YourDocuments from "./components/YourDocuments/YourDocuments";
import "./App.css";

function App() {
    return (
        <>
            <Navbar />
            <Welcome />
            <YourDocuments />
        </>
    );
}

export default App;
