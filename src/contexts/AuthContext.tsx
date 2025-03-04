import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface User {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: { displayName?: string; photoURL?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add test user data
const TEST_USERS = {
  admin: {
    email: 'admin@test.com',
    password: 'password123',
    name: 'Admin User',
    photoURL: 'https://api.dicebear.com/7.x/avatars/svg?seed=admin'
  },
  test: {
    email: 'test@test.com',
    password: 'password123',
    name: 'Test User',
    photoURL: 'https://api.dicebear.com/7.x/avatars/svg?seed=test'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a test user in localStorage
    const savedUser = localStorage.getItem('testUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        };
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Check for test users first
      const testUser = Object.values(TEST_USERS).find(u => u.email === email);
      if (testUser && password === testUser.password) {
        const user = {
          id: email,
          email: email,
          name: testUser.name,
          photoURL: testUser.photoURL
        };
        setUser(user);
        localStorage.setItem('testUser', JSON.stringify(user));
        return;
      }

      // Regular Firebase login
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL
      };
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Failed to login');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(firebaseUser, { displayName: name });
    } catch (error) {
      throw new Error('Failed to register');
    }
  };

  const logout = async () => {
    try {
      // Clear test user from localStorage
      localStorage.removeItem('testUser');
      setUser(null);
      
      // Also sign out from Firebase if needed
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Failed to logout');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  };

  const updateUserProfile = async (data: { displayName?: string; photoURL?: string }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');
      await updateProfile(currentUser, data);
      
      if (user) {
        setUser({
          ...user,
          name: data.displayName || user.name,
          photoURL: data.photoURL || user.photoURL
        });
      }
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateUserProfile
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 