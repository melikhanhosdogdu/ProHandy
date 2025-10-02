import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  DocumentData,
  WithFieldValue,
  UpdateData,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from './config';

// Firestore Service Class
class FirestoreService {
  // Create a document with auto-generated ID
  async create<T extends DocumentData>(
    collectionName: string,
    data: WithFieldValue<T>
  ): Promise<string> {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Set a document with specific ID
  async set<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: WithFieldValue<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Get a single document
  async get<T extends DocumentData>(
    collectionName: string,
    docId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as unknown as T;
      }
      return null;
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Get all documents from a collection
  async getAll<T extends DocumentData>(
    collectionName: string,
    constraints?: QueryConstraint[]
  ): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = constraints ? query(collectionRef, ...constraints) : collectionRef;
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Query documents
  async queryDocuments<T extends DocumentData>(
    collectionName: string,
    constraints: QueryConstraint[]
  ): Promise<T[]> {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as unknown as T[];
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Update a document
  async update<T extends DocumentData>(
    collectionName: string,
    docId: string,
    data: UpdateData<T>
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Delete a document
  async delete(collectionName: string, docId: string): Promise<void> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      throw this.handleFirestoreError(error);
    }
  }

  // Handle Firestore errors
  private handleFirestoreError(error: any): Error {
    const errorCode = error?.code || 'unknown';
    const errorMessages: { [key: string]: string } = {
      'permission-denied': 'You do not have permission to perform this action.',
      'not-found': 'Document not found.',
      'already-exists': 'Document already exists.',
      'resource-exhausted': 'Quota exceeded. Please try again later.',
      'failed-precondition': 'Operation failed. Please check the requirements.',
      'aborted': 'Operation was aborted.',
      'out-of-range': 'Operation is out of valid range.',
      'unimplemented': 'Operation is not implemented.',
      'internal': 'Internal error occurred.',
      'unavailable': 'Service is currently unavailable.',
      'data-loss': 'Unrecoverable data loss or corruption.',
      'unauthenticated': 'User is not authenticated.',
    };

    const message = errorMessages[errorCode] || error?.message || 'An unexpected error occurred.';
    return new Error(message);
  }
}

// Export query constraints for external use
export { where, orderBy, limit, serverTimestamp } from 'firebase/firestore';

export default new FirestoreService();