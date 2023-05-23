import React from 'react';
import {Avatar, Box, Divider, Group, rem, Text, UnstyledButton, useMantineTheme} from '@mantine/core';
import {auth} from '../../firebase';
import {getPseudoInitials} from '../../utils/util';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';

export function User() {
    const theme = useMantineTheme();
    const user = auth.currentUser

    return (
        <>
            <Divider size={rem(1)} color={theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}/>
            <UnstyledButton
                sx={{
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                }}
            >
                <Group>
                    <Avatar radius="xl" size={'md'} color={'blue'}>{ user?.displayName ? getPseudoInitials(user?.displayName) : 'LO'}</Avatar>
                    <Box sx={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                            { user?.displayName }
                        </Text>
                        <Text color="dimmed" size="xs">
                            { user?.email }
                        </Text>
                    </Box>

                    {theme.dir === 'ltr' ? (
                        <IconChevronRight size={rem(18)} />
                    ) : (
                        <IconChevronLeft size={rem(18)} />
                    )}
                </Group>
            </UnstyledButton>
        </>
    );
}