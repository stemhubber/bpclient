// UserController.js
// Central logic for user registration, verification, and sign-in using Twilio and Firebase Firestore

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

class UserController {
  constructor(apiBaseUrl = 'https://mapss-s29y.onrender.com') {
    this.apiBaseUrl = apiBaseUrl;
    this.confirmationCache = new Map(); // for temporary OTP storage (in-memory)
  }

  async sendOTP(phoneNumber) {
    try {
      const res = await fetch(`${this.apiBaseUrl}/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber })
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error || 'OTP send failed');
      // Optional: Save sid or verification data for local dev purposes
      this.confirmationCache.set(phoneNumber, data.sid || true);
      return true;
    } catch (error) {
      throw new Error('Failed to send OTP: ' + error.message);
    }
  }

  async confirmOTP(phoneNumber, code) {
    try {
      const res = await fetch(`${this.apiBaseUrl}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: phoneNumber, code })
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error || 'Verification failed');
      return data.userId || phoneNumber; // return user ID for further usage
    } catch (error) {
      throw new Error('Invalid verification code: ' + error.message);
    }
  }

  async registerUser(userId, userDetails) {
    console.log('Register user:', userId);
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userDetails);
  }

  async getUser(userId) {
    if(!userId) return null;
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    return snapshot.exists() ? snapshot.data() : null;
  }
  async getUserName(userId) {
    if(!userId) return null;
    const userRef = doc(db, 'users', userId);
    const snapshot = await getDoc(userRef);
    const data = snapshot.exists() ? snapshot.data() : null;
    return data?.name;
  }
}

export default new UserController();
