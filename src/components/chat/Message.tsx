import {Avatar, Flex, Paper, Text} from '@mantine/core';
import {getPseudoInitials} from '../../utils/util';

interface MessageProps {
    sender: string;
    content: any;
    received: boolean; // If message is not mine
}
export const Message = ({ sender, content, received }: MessageProps) => {

    return (
        <Paper px={'sm'} py={'xs'} withBorder>
            <Flex align={'center'} gap={'.3rem'}>
                <Avatar color={received ? 'green' : 'blue'} size={'sm'}>{ getPseudoInitials(sender)}</Avatar>
                <Text>{sender}</Text>
            </Flex>
            <Text size={'sm'} mt={'xs'}>{content}</Text>
        </Paper>
    )

}