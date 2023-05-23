import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {MantineProvider} from '@mantine/core';
import {SignIn} from './pages/SignIn';
import './styles/global.css';
import {Home} from './pages/Home';
import {ProtectedRoute} from './components/ProtectedRoute';
import {FirebaseAuthProvider} from './context/AuthContext';

export const App = () => {

    return (
        <FirebaseAuthProvider>
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<SignIn/>}/>
                        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                    </Routes>
                </BrowserRouter>
            </MantineProvider>
        </FirebaseAuthProvider>
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);