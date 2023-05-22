import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {createRoot} from 'react-dom/client';
import {MantineProvider} from '@mantine/core';
import {SignIn} from './pages/SignIn';
import './styles/global.css';
import {Home} from './pages/Home';

export const App = () => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<SignIn />} />
                    {/*<Route path="/signup" element={<SignUp />} />*/}
                    <Route path="/home" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    )
}

const root = createRoot(document.getElementById('app'));
root.render(<App/>);