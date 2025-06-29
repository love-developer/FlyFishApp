"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { UserService } from '../services/userService';
import { User } from '../../utils/models/user.model';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userService = new UserService();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user exists in Firestore
        let userData = await userService.getUserById(firebaseUser.uid);
        
        if (!userData) {
          // Create new user if doesn't exist
          userData = new User({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName: firebaseUser.displayName || '',
            profilePic: firebaseUser.photoURL || '',
            verified: firebaseUser.emailVerified,
            socialLoggedIn: firebaseUser.providerData[0]?.providerId !== 'password',
            createdAt: new Date(),
            lastActive: new Date()
          });
          await userService.createUser(userData);
        }

        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, fullName, referralCode = '') => {
    try {
      // Check referral code if provided
      if (referralCode) {
        const isValidReferral = await userService.checkReferralCode(referralCode);
        if (!isValidReferral) {
          throw new Error('Invalid referral code');
        }
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(userCredential.user, {
        displayName: fullName
      });

      // Create user in Firestore
      const userData = new User({
        uid: userCredential.user.uid,
        email: email,
        fullName: fullName,
        verified: false,
        socialLoggedIn: false,
        referredByCode: referralCode,
        createdAt: new Date(),
        lastActive: new Date()
      });

      await userService.createUser(userData);

      // Send email verification
      await sendEmailVerification(userCredential.user);
      
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const signInWithFacebook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateUserInContext = async (updatedData) => {
    setUser((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      signInWithGoogle,
      signInWithFacebook,
      updateUserInContext
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 