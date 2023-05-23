import React from 'react';
import {LoadingOverlay, Navbar, ScrollArea} from '@mantine/core';
import {User} from './NavbarUser';
import {NavbarItem} from './NavbarItem';
import {NavbarTitle} from './NavbarTitle';

interface BMSNavbarProps {
    users: any;
    selectedUser: any | null;
    setSelectedUser: (user: any) => void;
}

export const BMSNavbar = ({users, selectedUser, setSelectedUser}: BMSNavbarProps) => {

    return (
        <Navbar height={'100vh'}  width={{ base: 375 }}>

            <Navbar.Section>
                <NavbarTitle />
            </Navbar.Section>

            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                <LoadingOverlay visible={ users.length === 0 } />
                {
                    users.map((user: any) => {
                        return (
                            <NavbarItem key={user.userId} active={user.userId === selectedUser?.userId} user={user} setSelectedUser={setSelectedUser} />
                        )
                    })
                }

            </Navbar.Section>

            <Navbar.Section>
                <User />
            </Navbar.Section>
        </Navbar>
    );
}