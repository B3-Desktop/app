import React, {useEffect, useRef, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../firebase';
import {Flex, ScrollArea} from '@mantine/core';
import {Message} from './Message';
import {SendBar} from './SendBar';

interface ChatProps {
    user: any;
    receiver: any;
}
export const Chat = ({user, receiver}: ChatProps) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (receiver) {
            const unsub = onSnapshot(
                query(
                    collection(
                        db,
                        "users",
                        user?.uid,
                        "chatUsers",
                        receiver?.userId,
                        "messages"
                    ),
                    orderBy("timestamp")
                ),
                (snapshot) => {
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
            );
            return unsub;
        }
    }, [receiver]);

    return (
        <Flex direction={'column'} h={'100vh'} w={'100%'} justify={'end'}>
            <ScrollArea>
                <Flex direction={'column'} gap={'sm'} p={'sm'}>
                    {
                        messages.map((m: any) => {
                            return (
                                <Message key={m.id} content={m.message} sender={m.username} received={m.messageUserId !== user.uid} />
                            )
                        })
                    }
                </Flex>
            </ScrollArea>
            <SendBar user={user} receiver={receiver} />
        </Flex>
    )
}