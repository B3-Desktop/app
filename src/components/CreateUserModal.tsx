import {Button, LoadingOverlay, Modal, PasswordInput, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import {auth, db} from '../firebase';
import {doc, setDoc} from 'firebase/firestore';
import {notifications} from '@mantine/notifications';
import {useState} from 'react';
import {CreateUser} from '../types/CreateUser';

interface CreateUserModalProps {
    isOpen: boolean;
    close: () => void;
}

export const CreateUserModal = ({isOpen, close}: CreateUserModalProps) => {
    const [loading, setLoading] = useState(false);
    const form = useForm<CreateUser>({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validate: {
            username: (value) => (value.length < 3 ? 'Minimum 3 caractères' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Format non valide'),
            password: (value) => (value.length < 8 ? 'Minimum 8 caractères' : null),
        }
    });

    const handleSubmit = async (values: CreateUser) => {
        setLoading(true);
        try {
            const {username, email, password} = values;
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(auth.currentUser, {
                displayName: username,
            });

            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                userId: user.uid,
                timestamp: new Date(),
            });

            notifications.show({
                title: 'Succès ✅',
                message: "L'utilisateur a bien été créé et vous avez été connecté sur ce dernier automatiquement",
                color: 'green',
                autoClose: 5000,
            })
        } catch (error: any) {

            let message = 'Une erreur est survenue';
            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'Cet email est déjà utilisé';
                    break;
                case 'auth/invalid-email':
                    message = "Format d'email invalide";
                    break;
                case 'auth/weak-password':
                    message = 'Mot de passe trop faible';
                    break;
            }

            notifications.show({
                title: 'Erreur ❌',
                message: message,
                color: 'red',
                autoClose: 5000,
            })
        } finally {
            setLoading(false);
            close();
        }
    };

    return (
        <Modal opened={isOpen} onClose={close} title={"Ajout d'un utilisateur"} centered>
            <LoadingOverlay visible={loading}/>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <TextInput
                    label="Pseudo"
                    withAsterisk
                    {...form.getInputProps('username')}
                />
                <TextInput
                    label="Email"
                    type="email"
                    withAsterisk
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Mot de passe"
                    withAsterisk
                    {...form.getInputProps('password')}
                />
                <Button type="submit" variant="light" color="blue" fullWidth mt="sm">
                    Ajouter
                </Button>
            </form>
        </Modal>
    )
}