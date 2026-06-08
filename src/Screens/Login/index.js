import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Context } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GREEN = '#0c9102';

const LoginScreen = (props) => {
  const { navigation } = props;
  const [state, dispatch] = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [secureTextEntry, setsecureTextEntry] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [focused, setFocused] = useState(null); // 'email' | 'password' | null

  const login = () => {
    if (email === '' || password === '') {
      setErrorMessage('Enter username and password');
      setSnackbarVisible(true);
    } else if (
      (email === 'infi@apptest.com' || email === 'Infi@apptest.com') &&
      password === 'bestcrm'
    ) {
      setEmail('');
      SetPassword('');
      dispatch({ type: 'SET_SESSION', payload: 1 });
      try {
        AsyncStorage.setItem('sessionData', JSON.stringify('in'));
      } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
      }
    } else {
      setErrorMessage('Incorrect login details');
      setSnackbarVisible(true);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/8.jpg')}
      resizeMode="cover"
      style={styles.bg}
    >
      {/* dark overlay so the card pops */}
      <View style={styles.overlay} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View animation="fadeInUp" duration={800} style={styles.card}>
            <Image source={require('../../../assets/log.png')} style={styles.logo} />

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            {/* email */}
            <View
              style={[
                styles.inputWrap,
                focused === 'email' && styles.inputWrapFocused,
              ]}
            >
              <Ionicons name="person-outline" size={18} color={GREEN} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#9aa0a6"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
              />
            </View>

            {/* password */}
            <View
              style={[
                styles.inputWrap,
                focused === 'password' && styles.inputWrapFocused,
              ]}
            >
              <Ionicons name="lock-closed-outline" size={18} color={GREEN} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9aa0a6"
                secureTextEntry={secureTextEntry}
                value={password}
                onChangeText={SetPassword}
                returnKeyType="done"
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
              />
              <TouchableOpacity
                hitSlop={styles.hitSlop}
                onPress={() => setsecureTextEntry(!secureTextEntry)}
              >
                <Ionicons
                  name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9aa0a6"
                />
              </TouchableOpacity>
            </View>

            {/* login button */}
            <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={login}>
              <Text style={styles.buttonText}>LOG IN</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        duration={2000}
        onDismiss={() => setSnackbarVisible(false)}
        style={{ backgroundColor: '#323232' }}
        action={{ label: 'Retry', onPress: () => {} }}
      >
        {errorMessage}
      </Snackbar>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1 },
  flex: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.35)' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  logo: { width: 120, height: 100, resizeMode: 'contain', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '800', color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#888', marginTop: 4, marginBottom: 28 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    backgroundColor: '#F4F6F4',
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputWrapFocused: {
    borderColor: GREEN,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#1a1a1a',
    fontSize: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    borderRadius: 14,
    backgroundColor: GREEN,
    marginTop: 12,
    shadowColor: GREEN,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  hitSlop: { top: 12, bottom: 12, left: 12, right: 12 },
});

export default LoginScreen;