import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: "grocery-helper-d5b2d.firebaseapp.com",
  projectId: "grocery-helper-d5b2d",
  storageBucket: "grocery-helper-d5b2d.firebasestorage.app",
  messagingSenderId: "842739069422",
  appId: "1:842739069422:web:f4adccff105a546aa35eff",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
