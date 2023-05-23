import React from 'react';
import {Avatar, Group, Text, UnstyledButton} from '@mantine/core';
import {getPseudoInitials} from '../../utils/util';
import {BMSUser} from '../../types/BMSUser';

interface NavbarItemProps {
    user: BMSUser;
    setSelectedUser: (user: BMSUser) => void;
    active?: boolean;
}

export const NavbarItem = ({user, setSelectedUser, active}: NavbarItemProps) => {

    return (
        <UnstyledButton
            onClick={() => setSelectedUser(user)}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                color: theme.black,
                ...(active && {backgroundColor: theme.colors.green[0]}),

                '&:hover': {
                    backgroundColor: theme.colors.gray[0],
                },
            })}
        >
            <Group>
                <Avatar>{getPseudoInitials(user.username)}</Avatar>
                <Text size="sm">{user.username}</Text>
            </Group>
        </UnstyledButton>
    );
}

