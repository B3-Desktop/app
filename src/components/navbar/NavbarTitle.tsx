import {Divider, Group, rem, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import React from 'react';
import {IconUsersGroup} from '@tabler/icons-react';

export const NavbarTitle = () => {
    const theme = useMantineTheme();

    return (
        <>
            <UnstyledButton
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >
                <Group position={'center'}>
                    <IconUsersGroup stroke={1.2} size={25}/>
                    <Text size="md" fw={450}>Utilisateurs</Text>
                </Group>
            </UnstyledButton>
            <Divider size={rem(1)} color={theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}/>
        </>
    );
}