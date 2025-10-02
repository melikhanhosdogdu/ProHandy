import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '@/src/core/contexts/AuthContext';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const { signIn, loading, error, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLocalLoading(true);
      clearError();
      await signIn(email, password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message || 'An error occurred during login');
    } finally {
      setLocalLoading(false);
    }
  };

  const isLoading = loading || localLoading;
  const isDark = colorScheme === 'dark';

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <IconSymbol
              name="person.circle.fill"
              size={100}
              color={Colors[colorScheme ?? 'light'].tint}
            />
          </View>

          {/* Title */}
          <ThemedText type="title" style={styles.title}>
            Welcome Back
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign in to continue to ProHandy
          </ThemedText>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <View style={[styles.inputWrapper, isDark && styles.inputWrapperDark]}>
                <IconSymbol
                  name="envelope.fill"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <View style={[styles.inputWrapper, isDark && styles.inputWrapperDark]}>
                <IconSymbol
                  name="lock.fill"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  disabled={isLoading}
                >
                  <IconSymbol
                    name={showPassword ? 'eye.fill' : 'eye.slash.fill'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotButton} disabled={isLoading}>
              <Link href="/forgot-password" asChild>
                <ThemedText style={styles.forgotText}>Forgot Password?</ThemedText>
              </Link>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
              )}
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <ThemedText style={styles.signupText}>Don't have an account? </ThemedText>
              <TouchableOpacity disabled={isLoading}>
                <Link href="/register" asChild>
                  <ThemedText style={styles.signupLink}>Sign Up</ThemedText>
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.7,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputWrapperDark: {
    backgroundColor: '#2C2C2E',
    borderColor: '#3C3C3E',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  inputDark: {
    color: '#FFF',
  },
  eyeButton: {
    padding: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    opacity: 0.7,
  },
  signupLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});