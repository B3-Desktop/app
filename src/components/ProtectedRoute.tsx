import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {useFirebaseAuth} from '../hooks/useFirebaseAuth';

export const ProtectedRoute = ({children}: PropsWithChildren): JSX.Element => {
    const user = useFirebaseAuth();

    if (user === null) {
        return <Navigate to="/" replace/>;
    } else {
        return children as JSX.Element;
    }
}