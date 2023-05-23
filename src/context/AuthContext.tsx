import * as React from "react";
import {PropsWithChildren, useEffect, useState} from "react";
import {auth} from '../firebase';
import {User} from 'firebase/auth';

type ContextState = { user: User };

const FirebaseAuthContext =
    React.createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User>(undefined);
    const value = { user };

    useEffect(() => {
        return auth.onAuthStateChanged(setUser);
    }, []);

    return (
        <FirebaseAuthContext.Provider value={value}>
            {children}
        </FirebaseAuthContext.Provider>
    );
};

function useFirebaseAuth() {
    const context = React.useContext(FirebaseAuthContext);
    if (context === undefined) {
        throw new Error(
            "useFirebaseAuth must be used within a FirebaseAuthProvider"
        );
    }
    return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };