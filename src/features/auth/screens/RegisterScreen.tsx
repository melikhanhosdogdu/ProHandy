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
import { Link, router } from 'expo-router';

export default function RegisterScreen() {
  const colorScheme = useColorScheme();
  const { signUp, loading, error, clearError } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLocalLoading(true);
      clearError();
      await signUp(email, password, name);
      // Navigation will happen automatically due to auth state change
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'An error occurred during registration');
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
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            disabled={isLoading}
          >
            <IconSymbol name="chevron.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>

          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <IconSymbol
              name="person.badge.plus.fill"
              size={100}
              color={Colors[colorScheme ?? 'light'].tint}
            />
          </View>

          {/* Title */}
          <ThemedText type="title" style={styles.title}>
            Create Account
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign up to get started with ProHandy
          </ThemedText>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <View style={[styles.inputWrapper, isDark && styles.inputWrapperDark]}>
                <IconSymbol
                  name="person.fill"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Enter your name"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

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
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <View style={[styles.inputWrapper, isDark && styles.inputWrapperDark]}>
                <IconSymbol
                  name="lock.fill"
                  size={20}
                  color="#666"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="Confirm your password"
                  placeholderTextColor="#999"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeButton}
                  disabled={isLoading}
                >
                  <IconSymbol
                    name={showConfirmPassword ? 'eye.fill' : 'eye.slash.fill'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <ThemedText style={styles.registerButtonText}>Sign Up</ThemedText>
              )}
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={styles.signinContainer}>
              <ThemedText style={styles.signinText}>Already have an account? </ThemedText>
              <TouchableOpacity disabled={isLoading}>
                <Link href="/login" asChild>
                  <ThemedText style={styles.signinLink}>Sign In</ThemedText>
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
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    zIndex: 1,
    padding: 8,
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
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    fontSize: 14,
    opacity: 0.7,
  },
  signinLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
});