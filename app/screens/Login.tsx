import { Image, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native'
import { useAuth } from '../context/AuthContext';
import ParallaxScrollView from '../components/ParallaxScrollView';
import { ThemedView } from '../components/ThemedView';
import { useState } from 'react';
import { Snackbar } from 'react-native-paper';
import AuthButton from '../components/AuthButton';
import SeparatorWithText from '../components/SeparatorWithText';
import { ThemedText } from '../components/ThemedText';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const { onLogin } = useAuth();

  const validateEmail = (email: string) => {
    // Egyszerű email validáció regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const login = async () => {
    if (!emailError && !passwordError) {
      const result = await onLogin!(email, password);
      if (result && result.error) {
        alert(result.msg);
      }
    } else {
      setSnackbarMessage('❗ Please fix the errors before submitting.');
      setSnackbarVisible(true);
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
        <ThemedView style={styles.container} >
          <TextInput style={[styles.input, emailError ? styles.inputError : null]} placeholder="Email" onChangeText={(text: string) => { setEmail(text); validateEmail(text); }} value={email} />
          {emailError ? <ThemedText type='error'>{emailError}</ThemedText> : null}
          <TextInput style={[styles.input, passwordError ? styles.inputError : null]} placeholder="Password" secureTextEntry={true} onChangeText={(text: string) => { setPassword(text); validatePassword(text); }} value={password} />
          {passwordError ? <ThemedText type='error'>{passwordError}</ThemedText> : null}
          
          <AuthButton onPress={login} title='Sign in' />
          <SeparatorWithText text="Or" />
          <View style={styles.row}>
            <ThemedText type='subtitle'>Don’t have an account? </ThemedText>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <ThemedText type='link'>Sign up</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView >
      </ParallaxScrollView>
      {/* Snackbar pozicionálása a szülő komponensben */}
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
  )
}

export default Login

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
    width: "100%",
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
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
})