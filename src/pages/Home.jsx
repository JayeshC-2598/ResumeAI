import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import RecentDocs from "../components/RecentDocs";
import { useDocumentsContext } from "../context/DocumentsContext";
import { useAuthContext } from "../context/AuthContext";

function Home() {
    const { user, loading } = useAuthContext();
    // const { deleteTemp } = useDocumentsContext();
    const { initDocuments, AddNewDocument } = useDocumentsContext();

    useEffect(() => {
        console.log(user);
        initDocuments(user.uid);
    }, [])
    return (
        <>
            <HeroSection />
            <RecentDocs />
        </>
    );
}

export default Home;
