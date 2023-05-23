import * as React from "react";
import {createContext, PropsWithChildren, useEffect, useState} from "react";
import {auth} from '../firebase';
import {User} from 'firebase/auth';

type ContextState = { user: User };

export const FirebaseAuthContext = createContext<ContextState | undefined>(undefined);

export const FirebaseAuthProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User>(undefined);
    const value = {user};

    useEffect(() => {
        return auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    );
};