import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import { Snackbar } from 'react-native-paper';
import AuthButton from '../components/AuthButton';

const ForgetPassword = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordReset = async () => {
    if (!emailError && email) {
      // Itt hívd meg az API-t a jelszó-visszaállítás kéréshez
      try {
        // Példa: await api.requestPasswordReset(email);
        setSnackbarMessage('Password reset link sent to your email.');
        setSnackbarVisible(true);
      } catch (error) {
        setSnackbarMessage('Error: Unable to send reset link. Please try again.');
        setSnackbarVisible(true);
      }
    } else {
      setSnackbarMessage('❗ Please enter a valid email.');
      setSnackbarVisible(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Reset Password</ThemedText>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Enter your email"
        onChangeText={(text: string) => {
          setEmail(text);
          validateEmail(text);
        }}
        value={email}
      />
      {emailError ? <ThemedText type="error">{emailError}</ThemedText> : null}
      <AuthButton onPress={handlePasswordReset} title="Send Reset Link" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ThemedText type="link">Back to Login</ThemedText>
      </TouchableOpacity>

      {/* Snackbar */}
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
    </ThemedView>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#ccc',
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
