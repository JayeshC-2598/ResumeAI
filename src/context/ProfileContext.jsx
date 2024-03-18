import React, { createContext, useReducer } from 'react';
import { cloneState } from "../utils/cloneState";
const initialState = {
    settings: {
        personal: null,
        profession: null,
        education: null,
        skill: null
    }
}
export class ProfileType {
    SetPersonal = "SetPersonal";
    SetProfession = "SetProfession";
    SetEducation = "SetEducation";
    SetSkill = "SetSkill"
}
const profileReducer = (state, action) => {
    const clonedState = cloneState(state);
    switch (action.type) {
        case ProfileType.SetPersonal: {
            Object.assign(clonedState.settings.personal, action.payload);
            break;
        }
        case ProfileType.SetProfession: {
            Object.assign(clonedState.settings.profession, action.payload);
            break;
        }
        case ProfileType.SetEducation: {
            Object.assign(clonedState.settings.education, action.payload);
            break;
        }
        case ProfileType.SetSkill: {
            Object.assign(clonedState.settings.skill, action.payload);
            break;
        }
        default: {
            throw new Error('No action provided!');
        }
    }
    localStorage.setItem('settings', JSON.stringify(clonedState))
    return clonedState;
}
const ProfileContext = createContext({
    ...initialState,
    updateData: () => undefined
});

function ProfileProvider({ children }) {
    const [state, dispatch] = useReducer(profileReducer, initialState);
    const updateData = (type, data) => {
        dispatch({ type: type, payload: data })
    }
    return (
        <ProfileContext.Provider value={{ ...state, updateData }}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider