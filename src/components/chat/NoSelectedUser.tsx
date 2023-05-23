import {Flex, Image} from '@mantine/core';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import file from '../../assets/images/no-conversation.svg';

export const NoSelectedUser = () => {
    return (
        <Flex direction={'column'} align={'center'} justify={'center'} h={'100vh'} w={'100%'}>
            <Image src={file} width={450} height={325} />
        </Flex>
    )
}