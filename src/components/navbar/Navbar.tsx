import React from 'react';
import {LoadingOverlay, Navbar, ScrollArea} from '@mantine/core';
import {NavbarConnectedUser} from './NavbarConnectedUser';
import {NavbarItem} from './NavbarItem';
import {NavbarHeader} from './NavbarHeader';
import {BMSUser} from '../../types/BMSUser';

interface BMSNavbarProps {
    users: BMSUser[];
    selectedUser: BMSUser | null;
    setSelectedUser: (user: BMSUser) => void;
}

export const BMSNavbar = ({users, selectedUser, setSelectedUser}: BMSNavbarProps) => {

    return (
        <Navbar height={'100vh'} width={{base: 375}}>

            <Navbar.Section>
                <NavbarHeader/>
            </Navbar.Section>

            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                <LoadingOverlay visible={users.length === 0}/>
                {
                    users.map((user) => {
                        return (
                            <NavbarItem
                                key={user.userId}
                                active={user.userId === selectedUser?.userId}
                                user={user}
                                setSelectedUser={setSelectedUser}
                            />
                        )
                    })
                }
            </Navbar.Section>

            <Navbar.Section>
                <NavbarConnectedUser/>
            </Navbar.Section>
        </Navbar>
    );
}