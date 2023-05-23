import {BMSNavbar} from '../components/navbar/Navbar';
import React, {useEffect, useState} from 'react';
import {collection, onSnapshot,} from "firebase/firestore";
import {db} from '../firebase';
import {Chat} from '../components/chat/Chat';
import {Flex} from '@mantine/core';
import {BMSUser} from '../types/BMSUser';
import {useFirebaseAuth} from '../hooks/useFirebaseAuth';

export const Home = () => {
    const user = useFirebaseAuth()
    const [users, setUsers] = useState<BMSUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<BMSUser>(null);

    useEffect(() => {
        return onSnapshot(collection(db, "users"), (snapshot) => {
            const users = snapshot.docs.map((doc) => doc.data()) as BMSUser[];
            setUsers(users);
        });
    }, []);

    return (
        <Flex>
            <BMSNavbar
                users={users.filter(it => it.userId !== user.uid)}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />
            <Chat user={user} receiver={selectedUser}/>
        </Flex>
    )
}