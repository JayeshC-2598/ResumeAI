import React, { createContext, useContext, useMemo, useReducer } from "react";
import { securehttp } from "../config/axios-config";
import { useAuthContext } from "./AuthContext";
import { useEffect } from "react";
import toast from "react-hot-toast";


const GetDate = (time) => new Date(time).toISOString();

const initialConversation = {
    title: "Untitled",
    thread_id: "",
    logs: [],
    created_at: GetDate(new Date())
}

const DocumentsContext = createContext();

const docReducer = (state, action) => {
    let clonedDocs = [...state.documents];
    switch (action.type) {
        case 'SET_DOCS': {
            clonedDocs = action.payload;
            break;
        };
        case 'DELETE_DOC': {
            const indexOf = clonedDocs.findIndex(doc => doc.thread_id === action.payload)
            if (indexOf >= 0) {
                clonedDocs.splice(indexOf, 1);
            }
            break;
        }
        default: {
            console.log("Default");
            break;
        }
    }
    return { "documents": clonedDocs }
}

const conversationReducer = (state, action) => {
    const clonedConversation = { ...state };
    switch (action.type) {
        case 'RESET':
            return { ...initialConversation, created_at: GetDate(new Date()) };
        case 'SET':
            return action.payload
        case 'ADD':
            clonedConversation.data.push(action.payload);
            return clonedConversation
        case 'UPDATE':
            return { ...clonedConversation, ...action.payload }
        default:
            break;
    }
    return state;
}

export default function DocumentsContextProvider({ children }) {
    const { token, Logout } = useAuthContext()
    const [collection, dispatch] = useReducer(docReducer, { "documents": [] });
    const [conversation, dispatchConversation] = useReducer(conversationReducer, { ...initialConversation });

    const secureHttp = useMemo(() => {
        securehttp.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `token ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        securehttp.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (!error.response.config.url.includes("logout") && error.response.status == 401) {
                    Logout();
                }
                return Promise.reject(error);
            }
        );

        return securehttp;
    }, [token]);

    const setDocuments = (documents) => dispatch({ type: 'SET_DOCS', payload: documents });
    const deleteDocument = (thread_id) => dispatch({ type: 'DELETE_DOC', payload: thread_id });

    const ResetConversation = () => dispatchConversation({ type: 'RESET' });
    const setConversation = (data) => dispatchConversation({ type: 'SET', payload: data });
    // const updateConversation = (data) => dispatchConversation({ type: 'UPDATE', payload: data });

    const InitDocuments = async () => {
        secureHttp.get("/get-threads/")
            .then((resp) => {
                toast.success(resp.data.message);
                setDocuments(resp.data.data);
            })
            .catch((error) => {
                console.error("InitDocuments Error", error.message);
            })
    }

    const GenerateGraph = (question) => new Promise((resolve, reject) => {
        secureHttp.post("/generate-flow-graph/", question)
            .then((response) => {
                const output = response.data.data;//.replace("mermaid","").replace("```","").replace("```","");
                const created_at = GetDate(new Date());
                const _logs = [...conversation.logs];
                const entry = { "input_string": question.query, "output_string": output, "created_at": created_at };
                _logs.push(entry);
                setConversation({ ...conversation, logs: _logs });
                resolve(output);
            })
            .catch((error) => {
                reject(error);
            });
    })

    const SaveConversation = () => new Promise((resolve, reject) => {
        if (conversation.thread_id == "") {
            secureHttp.post("/save-thread-details/", conversation)
                .then((response) => {
                    setConversation(response.data);
                    resolve(response.data);
                })
                .catch(error => console.error(error));
        } else {
            secureHttp.post("/update-thread-details/", conversation)
                .then((response) => resolve(response.data))
                .catch(error => resolve(error));
        }
    });

    const GetConversation = (thread_id) => new Promise((resolve, reject) => {
        secureHttp.get(`/get-thread-details/${thread_id}`)
            .then((response) => {
                setConversation(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.error("GetConversation", error.message);
                reject(error)
            })
    });

    const DeleteDocument = (thread_id) => new Promise((resolve, reject) => {
        secureHttp.delete(`/delete-thread/${thread_id}`)
            .then((response) => {
                deleteDocument(thread_id);
                resolve(response.data);
            })
            .catch((error) => {
                console.error("DeleteConversation", error.message);
                reject(error)
            })

    });



    return (
        <DocumentsContext.Provider value={{
            ...collection,
            InitDocuments,

            conversation,
            setConversation,
            ResetConversation,

            DeleteDocument,
            GenerateGraph,
            SaveConversation,
            GetConversation,
        }}>{children}</DocumentsContext.Provider>
    )
}

export const useDocumentsContext = () => {
    const context = useContext(DocumentsContext);
    if (!context) throw Error("useDocumentsContext must be used inside an AuthContextProvider");
    return context;
}
