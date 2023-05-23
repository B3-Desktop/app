import {Avatar, createStyles, Divider, Flex, rem, Text} from '@mantine/core';
import {getPseudoInitials} from '../../utils/util';

const useStyle = createStyles((theme) => ({
    root: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '45px'
    }
}));

interface ChatHeaderProps {
    receiver: any;
}
export const ChatHeader = ({ receiver }: ChatHeaderProps) => {
    const { classes, theme } = useStyle();

    return (
        <div className={classes.root}>
            <Flex h={'100%'} w={'100%'} align={'center'} gap={'.4rem'} px={'md'}>
                <Avatar color={'green'} size={'sm'}>{ getPseudoInitials(receiver.username)}</Avatar>
                <Text size={'md'} fw={550}>{receiver.username}</Text>
            </Flex>
            <Divider style={{zIndex: 99999}} size={rem(1)} color={theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}/>
        </div>
    )
}