import React, { createContext, useContext, useReducer } from "react";
import { db } from "../config/firebase-config";
import { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { addDoc, collection as collection2, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";



export const DocumentsContext = createContext();

const currentTime = () => new Date().getTime();

const DocTemplate = {
    name: "Untitled",
    resume_content: "",
    job_description: "",
    response: "",
    custom_instruction: "",
    created_on: '',
    category: null,
}

const docReducer = (state, action) => {
    let clonedDocs = [...state.documents];
    let clonedTemp = { ...state.tempDoc };
    switch (action.type) {
        case 'SET_DOCS': {
            clonedDocs = action.payload;
            break;
        };
        // case 'ADD_DOC': {
        //     const indexof = clonedDocs.findIndex((item) => item.id === clonedTemp.id)
        //     if (indexof === -1) {
        //         clonedDocs.push({ ...clonedTemp, resume: '' });
        //     }
        //     // else {
        //     //     clonedDocs[indexof] = { ...clonedTemp, resume: '' }
        //     // }
        //     // clonedTemp = { ...DocTemplate, id: currentTime() };
        //     // localStorage.setItem('documents', JSON.stringify(clonedDocs));
        //     break;
        // }
        case 'DELETE_DOC': {
            const indexOf = clonedDocs.findIndex(doc => doc.id === action.payload)
            if (indexOf >= 0) {
                clonedDocs.splice(indexOf, 1);
            }
            // clonedTemp = { ...DocTemplate, id: currentTime() };
            // localStorage.setItem('documents', JSON.stringify(clonedDocs));
            break;
        }
        // case 'SET_TEMP': {
        //     clonedTemp = action.payload;
        //     break;
        // }
        // case 'DELETE_TEMP': {
        //     clonedTemp = { ...DocTemplate };
        //     break;
        // }
        default: {
            console.log("Default");
            break;
        }
    }
    return { "documents": clonedDocs, "tempDoc": clonedTemp }
}

export default function DocumentsContextProvider({ children }) {
    const { user } = useAuthContext()
    const [collection, dispatch] = useReducer(docReducer, {
        documents: [],
        tempDoc: DocTemplate
    });
    const tabtypes = ["all", "resume", "coverletter"];

    const setDocuments = (documents) => new Promise((resolve, reject) => {
        dispatch({ type: 'SET_DOCS', payload: documents });
    });
    const deleteDocument = (documentID) => {
        dispatch({ type: 'DELETE_DOC', payload: documentID });
    }
    const initDocuments = async (uid) => {
        const querySnapshot = await getDocs(collection2(db, `/documents/${user.uid}/resume`));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(data);
        setDocuments(data);
    }
    const GetTextFromResume = (file) => new Promise((resolve, reject) => {
        fetch('https://common-unst-backend.ongil.ai/api/travel/pdf-to-text/', {
            headers: {
            }, method: 'POST',
            body: file
        }).then((response) => {
            if (response.ok)
                resolve(response.json());
            else reject(response);
        })
            .catch((error) => reject(error));
    });
    const AddNewDocument = (document) => new Promise((resolve, reject) => {
        addDoc(collection2(db, `/documents/${user.uid}/resume`), document).then((docRef) => {
            resolve(docRef)
        }).catch((error) => {
            reject(error);
        });
    });
    const GetDocumentById = async (did) => {
        const indexOf = collection.documents.findIndex(item=>item.id === did);
        if(indexOf === -1){
            const docSnapshot = await getDoc(doc(db,`/documents/${user.uid}/resume`,did));
            if(docSnapshot.exists()){
                return {id:docSnapshot.id,...docSnapshot.data()}
            }
        }else{
            return collection.documents[indexOf];
        }
        return null;
    }

    const DeleteDocument = (documentID) => new Promise((resolve, reject) => {
        deleteDoc(doc(db, `/documents/${user.uid}/resume/${documentID}`), document).then((resp) => {
            console.log("DeleteDocument", resp);
            deleteDocument(documentID);
            resolve(resp)
        }).catch((error) => {
            console.error("DeleteDocument", error);
            reject(error);
        });
    });

    useEffect(() => { }, []);
    return (
        <DocumentsContext.Provider value={{
            ...collection,
            tabtypes,
            setDocuments,
            initDocuments,
            AddNewDocument,
            GetTextFromResume,
            DeleteDocument,
            GetDocumentById,
        }}>{children}</DocumentsContext.Provider>
    )
}

export const useDocumentsContext = () => {
    const context = useContext(DocumentsContext);
    if (!context) throw Error("useDocumentsContext must be used inside an AuthContextProvider");
    return context;
}
