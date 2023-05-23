import React, {useEffect, useRef, useState} from 'react';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../../firebase';
import {Flex, ScrollArea} from '@mantine/core';
import {Message} from './Message';
import {SendBar} from './SendBar';
import {NoSelectedUser} from './NoSelectedUser';
import {ChatHeader} from './ChatHeader';

interface ChatProps {
    user: any;
    receiver: any;
}
export const Chat = ({user, receiver}: ChatProps) => {
    const [messages, setMessages] = useState([]);
    const dummy = useRef(null);

    useEffect(() => {
        dummy?.current?.scrollIntoView(/*{ behavior: "smooth" }*/);
    }, [messages])

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


    if (!receiver) {
        return (
            <NoSelectedUser />
        )
    }

    return (
        <div style={{ position: 'relative',height:'100vh', width:'100%'}}>
            <ChatHeader receiver={receiver} />
            <Flex direction={'column'} style={{ height: 'calc(100% - 45px)'}} w={'100%'} justify={'end'}>
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <ScrollArea styles={{ root: { position: 'inherit!important' }}}>
                    <Flex direction={'column'} gap={'xs'} px={'md'} pt={'xs'}>
                        {
                            messages.map((m: any) => {
                                return (
                                    <Message key={m.id} content={m.message} sender={m.username} received={m.messageUserId !== user.uid} />
                                )
                            })
                        }
                    </Flex>
                    <div ref={dummy} />
                </ScrollArea>
                <SendBar user={user} receiver={receiver} />
            </Flex>
        </div>
    )
}