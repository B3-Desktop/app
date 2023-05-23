import {Avatar, Flex, Paper, Text} from '@mantine/core';
import {getPseudoInitials} from '../../utils/util';
import {BMSMessage} from '../../types/Message';

interface MessageProps {
    message: BMSMessage
    isMine: boolean; // If message is not mine
}

export const Message = ({message, isMine}: MessageProps) => {

    return (
        <Paper px={'sm'} py={'xs'} withBorder>
            <Flex align={'center'} gap={'.3rem'}>
                <Avatar color={isMine ? 'green' : 'blue'} size={'sm'}>{getPseudoInitials(message.username)}</Avatar>
                <Text>{message.username}</Text>
            </Flex>
            <Text size={'sm'} mt={'xs'}>{message.message}</Text>
        </Paper>
    )

}