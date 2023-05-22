import {Button, createStyles, Paper, PasswordInput, rem, SimpleGrid, Text, TextInput, Title,} from '@mantine/core';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
import {auth} from '../firebase';
import {useForm} from '@mantine/form';

const useStyles = createStyles((theme) => ({

    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        backgroundColor: '#110042',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center bottom',
        backgroundSize: '160vh',

        display: 'grid',
        placeItems: 'center',
    },

    title: {
        fontSize: rem(26),
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

}));

interface AuthenticationForm {
    email: string;
    password: string;
}

export const SignIn = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();

    const form = useForm<AuthenticationForm>({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Format non valide'),
            password: (value) => (value.length < 8 ? 'Minimum 8 caractères' : null),
        }
    });

    const handleSubmit = async (values: AuthenticationForm) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password)
            navigate("/home");
        } catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-email':
                    alert('Email invalide');
                    break;
                case 'auth/user-disabled':
                    alert('Utilisateur désactivé');
                    break;
                case 'auth/user-not-found':
                    alert('Utilisateur non trouvé');
                    break;
                case 'auth/wrong-password':
                    alert('Mot de passe incorrect');
                    break;
                default:
                    alert('Une erreur est survenue');
                    break;
            }
        }
    };

    return (
        <div className={classes.wrapper}>
            <Paper withBorder shadow="md" p={50} radius="md">
                <Title className={classes.title} align="center" mb={'xs'}>
                    Bienvenue
                </Title>
                <Text color="dimmed" size="sm" align="center" my={'xs'}>
                    Vos identifiants vous ont été envoyés par mail.
                </Text>
                <form onSubmit={form.onSubmit(values => handleSubmit(values)) }>
                    <SimpleGrid cols={1} mt={'md'} mb={'xl'} spacing={'sm'}>
                        <TextInput label="Email" placeholder="you@bmscorp.fr" withAsterisk {...form.getInputProps('email')} />
                        <PasswordInput label="Mot de passe" placeholder="Mot de passe" withAsterisk {...form.getInputProps('password')}/>
                    </SimpleGrid>

                    <Button type={'submit'} fullWidth mt="sm">
                        Connexion
                    </Button>
                </form>
            </Paper>
        </div>
    );
}