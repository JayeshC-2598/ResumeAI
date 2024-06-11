import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import RecentDocs from "../components/RecentDocs";
import { useDocumentsContext } from "../context/DocumentsContext";
import { useAuthContext } from "../context/AuthContext";

function Home() {
    const { token } = useAuthContext();
    const { InitDocuments } = useDocumentsContext();

    useEffect(() => {
        if (token)
            InitDocuments();
    }, [token])


    return (
        <>
            <HeroSection />
            <RecentDocs />
        </>
    );
}

export default Home;
