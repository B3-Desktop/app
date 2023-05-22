import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyB01cou280PE6A_kDcdPGQpZc2hq-WnIpc',
    authDomain: 'b3-desktop-3181e.firebaseapp.com',
    projectId: 'b3-desktop-3181e',
    storageBucket: 'b3-desktop-3181e.appspot.com',
    messagingSenderId: '342025398599',
    appId: '1:342025398599:web:fa6f367a4543d6b0fec462',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


