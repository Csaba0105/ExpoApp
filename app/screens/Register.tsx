import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Snackbar } from 'react-native-paper';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { ThemedView } from '../components/ThemedView';
import AuthButton from '../components/AuthButton';
import SeparatorWithText from '../components/SeparatorWithText';
import { ThemedText } from '../components/ThemedText';

const Register = ({ navigation }: any) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { onRegister } = useAuth();

    const validate = () => {
        const newErrors: any = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!firstName) newErrors.firstName = 'First name is required';
        if (!lastName) newErrors.lastName = 'Last name is required';

        if (!email) newErrors.email = 'Email is required';
        else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format';

        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (password !== rePassword) newErrors.rePassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validate()) {
            setSnackbarMessage('❗ Please fix the errors before submitting.');
            setSnackbarVisible(true);
            return;
        }

        const result = await onRegister!(email, password, firstName, lastName);
        if (result?.error) {
            setSnackbarMessage(result.msg || 'Registration failed.');
            setSnackbarVisible(true);
        } else {
            navigation.navigate('Login');
        }
    };

    return (
        <View style={styles.wrapper}>
            <ParallaxScrollView
                headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                headerImage={
                    <Image
                        source={require('../../assets/partial-react-logo.png')}
                        style={styles.reactLogo}
                    />
                }
            >
                <ThemedView style={styles.container}>
                    <TextInput
                        style={[styles.input, errors.firstName ? styles.inputError : null]}
                        placeholder="First Name"
                        onChangeText={(text) => setFirstName(text)}
                        value={firstName}
                    />
                    {errors.firstName ? <ThemedText type='error'>{errors.firstName}</ThemedText> : null}

                    <TextInput
                        style={[styles.input, errors.lastName ? styles.inputError : null]}
                        placeholder="Last Name"
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                    />
                    {errors.lastName ? <ThemedText type='error'>{errors.lastName}</ThemedText> : null}

                    <TextInput
                        style={[styles.input, errors.email ? styles.inputError : null]}
                        placeholder="Email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    {errors.email ? <ThemedText type='error'>{errors.email}</ThemedText> : null}

                    <TextInput
                        style={[styles.input, errors.password ? styles.inputError : null]}
                        placeholder="Password"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                    {errors.password ? <ThemedText type='error'>{errors.password}</ThemedText> : null}

                    <TextInput
                        style={[styles.input, errors.rePassword ? styles.inputError : null]}
                        placeholder="Re-Enter Password"
                        secureTextEntry
                        onChangeText={(text) => setRePassword(text)}
                        value={rePassword}
                    />
                    {errors.rePassword ? <ThemedText type='error'>{errors.rePassword}</ThemedText> : null}

                    <AuthButton onPress={handleRegister} title='Create Account' />
                    <SeparatorWithText text="Or" />
                    <AuthButton onPress={() => navigation.navigate('Login')} title="Sign in" />
                </ThemedView>
            </ParallaxScrollView>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                action={{
                    label: 'Close',
                    onPress: () => setSnackbarVisible(false),
                }}
                style={styles.snackbar}
            >
                {snackbarMessage}
            </Snackbar>
        </View>
    );
};

export default Register;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    input: {
        borderWidth: 1,
        height: 50,
        width: '100%',
        maxWidth: 500,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    snackbar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 16,
    },
});