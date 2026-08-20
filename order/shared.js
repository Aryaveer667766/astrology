/**
 * shared.js
 * Central Firebase Engine & Utilities
 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  GeoPoint,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Exact Firebase Configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAZ_c3EaDxSZ6RrNrwQjR_TauJHrPfk_lk",
  authDomain: "designsnap-f3309.firebaseapp.com",
  databaseURL: "https://designsnap-f3309-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "designsnap-f3309",
  storageBucket: "designsnap-f3309.firebasestorage.app",
  messagingSenderId: "741888249963",
  appId: "1:741888249963:web:9540c9f68d6f0d5da9a12e",
  measurementId: "G-YC8TDQF1MM"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Default Platform Services & Ranchi Benchmarks
export const DEFAULT_SERVICES = [
  { id: "griha_pravesh", name: "Griha Pravesh Puja", baseFare: 3100, duration: "3-4 hrs", samagriFee: 850 },
  { id: "satyanarayan_katha", name: "Shree Satyanarayan Katha", baseFare: 1500, duration: "2 hrs", samagriFee: 450 },
  { id: "rudrabhishek", name: "Maha Rudrabhishek", baseFare: 2500, duration: "2.5 hrs", samagriFee: 750 },
  { id: "marriage", name: "Vivah Sanskar (Marriage)", baseFare: 11000, duration: "Full Day", samagriFee: 2500 },
  { id: "vastu_shanti", name: "Vastu Shanti Puja", baseFare: 2100, duration: "2 hrs", samagriFee: 650 },
  { id: "navgrah_shanti", name: "Navgrah Shanti Havan", baseFare: 2100, duration: "2 hrs", samagriFee: 600 }
];

export const RANCHI_CENTER = { lat: 23.3441, lng: 85.3096 };

/**
 * Fetch or Initialize Platform Settings (UPI ID, WhatsApp number, Payment mode)
 */
export async function getPlatformSettings() {
  const settingsRef = doc(db, "settings", "platform");
  const snap = await getDoc(settingsRef);
  if (snap.exists()) {
    return snap.data();
  }
  const defaultSettings = {
    paymentMethod: "upi", // 'upi' | 'link' | 'whatsapp'
    upiId: "vaidika.ranchi@okaxis",
    upiPayeeName: "Vaidika Spiritual Services",
    paymentLinkUrl: "https://pages.razorpay.com/sample-puja-dakshina",
    whatsappNumber: "919123456780",
    platformCommissionPercent: 10,
    allowPanditCustomRates: true,
    updatedAt: serverTimestamp()
  };
  await setDoc(settingsRef, defaultSettings);
  return defaultSettings;
}

/**
 * Trigger sound effect for notifications
 */
export function playAlertChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    console.log("Audio not allowed yet by user interaction");
  }
}

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInAnonymously,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  GeoPoint,
  serverTimestamp
};
