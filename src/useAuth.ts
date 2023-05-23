import {auth} from './firebase';

async function waitForAuthInit() {
    let unsubscribe: (() => void) | undefined;
    await new Promise<void>((resolve) => {
        unsubscribe = auth.onAuthStateChanged(() => resolve());
    });
    (await unsubscribe)();
}

export async function getCurrentUser() {
    try {
        await waitForAuthInit();
        return await auth.currentUser;
    } catch (err: any) {
        console.log('Failed to get current user...', err);
        return null;
    }
}