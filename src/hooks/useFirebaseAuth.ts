import {useContext} from 'react';
import {FirebaseAuthContext} from '../contexts/AuthContext';

export const useFirebaseAuth = () => {
    const context = useContext(FirebaseAuthContext);

    if (context === undefined) {
        throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
    }

    return context.user;
}