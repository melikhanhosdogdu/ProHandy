import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  onAuthStateChanged,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  Auth,
} from 'firebase/auth';
import { auth as firebaseAuth } from './config';

// Auth Service Class
class AuthService {
  private auth: Auth = firebaseAuth;

  // Sign up with email and password
  async signUp(email: string, password: string, displayName?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Update display name if provided
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Sign out
  async signOut() {
    try {
      await firebaseSignOut(this.auth);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Send password reset email
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Update user profile
  async updateUserProfile(updates: { displayName?: string; photoURL?: string }) {
    try {
      const user = this.auth.currentUser;
      if (!user) throw new Error('No user logged in');

      await updateProfile(user, updates);
      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Update email
  async updateUserEmail(newEmail: string, currentPassword: string) {
    try {
      const user = this.auth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');

      // Re-authenticate user before updating email
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updateEmail(user, newEmail);

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Update password
  async updateUserPassword(newPassword: string, currentPassword: string) {
    try {
      const user = this.auth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');

      // Re-authenticate user before updating password
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      return user;
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  // Subscribe to auth state changes
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }

  // Handle auth errors
  private handleAuthError(error: any): Error {
    const errorCode = error?.code || 'unknown';
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'This email is already registered.',
      'auth/invalid-email': 'Invalid email address.',
      'auth/operation-not-allowed': 'Operation not allowed.',
      'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
    };

    const message = errorMessages[errorCode] || error?.message || 'An unexpected error occurred.';
    return new Error(message);
  }
}

export default new AuthService();