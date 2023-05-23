import {ActionIcon, TextInput, useMantineTheme} from '@mantine/core';
import {IconSend} from '@tabler/icons-react';
import {useState} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../firebase';
import {BMSUser} from '../../types/BMSUser';
import {User} from 'firebase/auth';
import {notifications} from '@mantine/notifications';

interface SendBarProps {
    user: User;
    receiver: BMSUser;
}

export const SendBar = ({user, receiver}: SendBarProps) => {
    const [message, setMessage] = useState('');

    const sendMessage = async () => {
        try {
            if (user && receiver) {
                await addDoc(
                    collection(db, "users", user.uid, "chatUsers", receiver.userId, "messages"), {
                        username: user.displayName,
                        messageUserId: user.uid,
                        message: message,
                        timestamp: new Date(),
                    }
                );

                await addDoc(collection(db, "users", receiver.userId, "chatUsers", user.uid, "messages"), {
                        username: user.displayName,
                        messageUserId: user.uid,
                        message: message,
                        timestamp: new Date(),
                    }
                );
            }
        } catch (error) {
            notifications.show({
                title: "Erreur ❌",
                message: "Une erreur est survenue lors de l'envoi du message",
                color: "red",
            })
        } finally {
            setMessage('');
        }
    };

    return (
        <TextInput
            p={'md'}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon size={32} radius="xl" color={'blue'} variant="filled" onClick={sendMessage}>
                    <IconSend size="1.1rem" stroke={1.5}/>
                </ActionIcon>
            }
            placeholder="Envoyer un message"
            rightSectionWidth={42}
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
            onKeyDown={(event) => event.key === "Enter" && message !== '' && sendMessage()}
        />
    );
}