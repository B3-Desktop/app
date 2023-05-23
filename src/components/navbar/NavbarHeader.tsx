import {Divider, Group, rem, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import React, {useState} from 'react';
import {IconChevronDown, IconChevronUp, IconUsersGroup} from '@tabler/icons-react';
import {NavbarHeaderMenu} from './NavbarHeaderMenu';

export const NavbarHeader = () => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    return (
        <>
            <UnstyledButton
                onClick={() => setOpened(!opened)}
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    color: theme.black,

                    '&:hover': {
                        backgroundColor: theme.colors.gray[0],
                    },
                })}
            >
                <Group position={'center'}>
                    <IconUsersGroup stroke={1.2} size={25}/>
                    <Text size="md" fw={450}>Utilisateurs</Text>
                    {!opened ? <IconChevronDown stroke={1.2} size={20}/> : <IconChevronUp stroke={1.2} size={20}/>}
                </Group>
            </UnstyledButton>
            <NavbarHeaderMenu opened={opened}/>

            <Divider size={rem(1)} color={theme.colors.gray[2]}/>
        </>
    );
}