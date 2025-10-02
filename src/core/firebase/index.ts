// Export Firebase configuration and services
export { app, auth, db, storage, analytics } from './config';
export { default as AuthService } from './auth.service';
export { default as FirestoreService, where, orderBy, limit, serverTimestamp } from './firestore.service';

// Re-export commonly used Firebase types
export type { User } from 'firebase/auth';
export type { DocumentData, QueryConstraint, Timestamp } from 'firebase/firestore';