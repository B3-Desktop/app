import {Collapse, Divider, Group, rem, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {IconList, IconPlus} from '@tabler/icons-react';
import React from 'react';
import {useDisclosure} from '@mantine/hooks';
import {CreateUserModal} from '../CreateUserModal';

interface NavbarHeaderMenuProps {
    opened: boolean;
}

export const NavbarHeaderMenu = ({opened}: NavbarHeaderMenuProps) => {
    const theme = useMantineTheme()

    const [cOpened, {open, close}] = useDisclosure();

    return (
        <Collapse in={opened}>
            <CreateUserModal isOpen={cOpened} close={close}/>

            <Divider size={rem(1)} color={theme.colors.gray[2]}/>
            <UnstyledButton
                onClick={open}
                sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    color: theme.black,

                    '&:hover': {
                        backgroundColor: theme.colors.green[2],
                    },
                })}
            >
                <Group>
                    <IconPlus stroke={1.2} size={15}/>
                    <Text size="sm" fw={450}>Ajouter un utilisateur</Text>
                </Group>

            </UnstyledButton>
        </Collapse>
    )
}