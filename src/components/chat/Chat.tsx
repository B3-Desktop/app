import React, {useEffect, useRef, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase';
import {Flex, ScrollArea} from '@mantine/core';
import {Message} from './Message';
import {SendBar} from './SendBar';
import {NoSelectedUser} from './NoSelectedUser';
import {ChatHeader} from './ChatHeader';
import {BMSUser} from '../../types/BMSUser';
import {User} from 'firebase/auth';
import {BMSMessage} from '../../types/Message';

interface ChatProps {
    user: User;
    receiver: BMSUser;
}

export const Chat = ({user, receiver}: ChatProps) => {
    const [messages, setMessages] = useState<BMSMessage[]>([]);
    const dummy = useRef(null);

    useEffect(() => {
        dummy?.current?.scrollIntoView();
    }, [messages])

    useEffect(() => {
        if (receiver) {
            return onSnapshot(
                query(
                    collection(db, "users", user?.uid, "chatUsers", receiver?.userId, "messages"),
                    orderBy("timestamp")
                ),
                (snapshot) => {
                    const messages = snapshot.docs.map((doc) => (
                        {id: doc.id, ...doc.data()} as BMSMessage
                    ));
                    setMessages(messages);
                }
            );
        }
    }, [receiver]);


    if (!receiver) {
        return (
            <NoSelectedUser/>
        )
    }

    return (
        <div style={{position: 'relative', height: '100vh', width: '100%'}}>
            <ChatHeader receiver={receiver}/>
            <Flex direction={'column'} style={{height: 'calc(100% - 45px)'}} w={'100%'} justify={'end'}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <ScrollArea styles={{root: {position: 'inherit!important'}}}>
                    <Flex direction={'column'} gap={'xs'} px={'md'} pt={'xs'}>
                        {
                            messages.map((m) => {
                                return (
                                    <Message key={m.id} message={m} isMine={m.messageUserId !== user.uid}/>
                                )
                            })
                        }
                    </Flex>
                    <div ref={dummy}/>
                </ScrollArea>
                <SendBar user={user} receiver={receiver}/>
            </Flex>
        </div>
    )
}