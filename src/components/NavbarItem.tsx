import React from 'react';
import {Avatar, Group, Text, UnstyledButton} from '@mantine/core';
import {getPseudoInitials} from '../utils/util';

interface NavbarItemProps {
    user: any;
    setSelectedUser: (user: any) => void;
    active?: boolean;
}

export const NavbarItem = ({ user, setSelectedUser, active }: NavbarItemProps) => {

    return (
        <UnstyledButton onClick={() => setSelectedUser(user)}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                ...(active && { backgroundColor: theme.colors.green[0] }),

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            })}
        >
            <Group>
                <Avatar>{ getPseudoInitials(user.username) }</Avatar>
                <Text size="sm">{user.username}</Text>
            </Group>
        </UnstyledButton>
    );
}

