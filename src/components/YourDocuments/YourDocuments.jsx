import React, { useState } from "react";
import "./YourDocuments.css";

function YourDocuments() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const handleItemClick = (category) => {
        console.log("Selected Category: ", category);
        setSelectedCategory(category);
    };

    const documents = [
        {
            id: 1,
            title: "document1",
            image: "No Image",
            category: "resume",
            createdOn: "Date",
            lastUpdated: "Date",
        },
        {
            id: 2,
            title: "document2",
            image: "No Image",
            category: "resume",
            createdOn: "Date",
            lastUpdated: "Date",
        },
        {
            id: 3,
            title: "document3",
            image: "No Image",
            category: "coverletters",
            createdOn: "Date",
            lastUpdated: "Date",
        },
    ];

    const filterDocuments =
        selectedCategory === "All"
            ? documents
            : documents.filter(
                  (doc) =>
                      doc.category.toLowerCase() ===
                      selectedCategory.toLowerCase()
              );

    console.log("Filtered Documents: ", filterDocuments);

    return (
        <div className="outer-div documents-contain">
            <p>Your Documents</p>
            <ul>
                <li
                    onClick={() => handleItemClick("All")}
                    className={selectedCategory === "All" ? "selected" : ""}
                >
                    All
                </li>
                <li
                    onClick={() => handleItemClick("Resume")}
                    className={selectedCategory === "Resume" ? "selected" : ""}
                >
                    Resume
                </li>
                <li
                    onClick={() => handleItemClick("Coverletters")}
                    className={
                        selectedCategory === "Coverletters" ? "selected" : ""
                    }
                >
                    Coverletters
                </li>
            </ul>

            <div className="document-row">
                {filterDocuments.map((document) => (
                    <div key={document.id} className="document-item">
                        {document.image && (
                            <img
                                src={document.image}
                                alt={document.title}
                                className="document-image"
                            />
                        )}
                        <div className="document-text">
                            <p className="document-title">
                                Title: {document.title}
                            </p>
                            <p className="document-category">
                                Category: {document.category}{" "}
                            </p>
                            <p className="document-date">
                                Created On: {document.createdOn}{" "}
                            </p>
                            <p className="document-date">
                                Last Updated: {document.lastUpdated}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default YourDocuments;
