import React from 'react';
import {Avatar, Box, Divider, Group, rem, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {auth} from '../../firebase';
import {getPseudoInitials} from '../../utils/util';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';
import {useFirebaseAuth} from '../../hooks/useFirebaseAuth';
import {notifications} from '@mantine/notifications';
import {modals} from '@mantine/modals';

export function NavbarConnectedUser() {
    const theme = useMantineTheme();
    const user = useFirebaseAuth()

    const handleSignOut = () => {
        modals.openConfirmModal({
            title: 'Déconnexion',
            centered: true,
            children: (
                <Text size="sm">
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </Text>
            ),
            labels: { confirm: 'Confirmer', cancel: 'Annuler' },
            confirmProps: { color: 'red', size: 'xs' },
            cancelProps: { color: 'gray', size: 'xs' },
            onConfirm: () => signOut(),
        });
    }

    const signOut = async () => {
        await auth.signOut()
        notifications.show({
            title: 'Déconnexion ✅',
            message: 'Vous avez été déconnecté avec succès.',
            color: 'green',
        })
    }

    return (
        <>
            <Divider size={rem(1)} color={theme.colors.gray[2]}/>
            <UnstyledButton
                onClick={handleSignOut}
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.black,

                    '&:hover': {
                        backgroundColor: theme.colors.gray[0],
                    },
                }}
            >
                <Group>
                    <Avatar radius="xl" size={'md'}
                            color={'blue'}>{user?.displayName ? getPseudoInitials(user?.displayName) : 'LO'}</Avatar>
                    <Box sx={{flex: 1}}>
                        <Text size="sm" weight={500}>
                            {user?.displayName}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {user?.email}
                        </Text>
                    </Box>
                </Group>
            </UnstyledButton>
        </>
    );
}