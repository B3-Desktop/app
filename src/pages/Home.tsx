import {BMSNavbar} from '../components/navbar/Navbar';
import React, {useEffect, useState} from 'react';
import {collection, onSnapshot,} from "firebase/firestore";
import {auth, db} from '../firebase';
import {Chat} from '../components/chat/Chat';
import {Flex} from '@mantine/core';

export const Home = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const user = auth.currentUser;


    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            setUsers(snapshot.docs.map((doc) => doc.data()));
        });
        return unsub;
    }, []);



    return (
        <Flex>
            <BMSNavbar users={users.filter(it => it.userId !== user.uid)} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            <Chat user={user} receiver={selectedUser}/>
        </Flex>
    )
}