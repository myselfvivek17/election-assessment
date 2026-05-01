import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  Timestamp 
} from "firebase/firestore";
import { db } from "./config";

export type UserPreferences = {
  favoriteBooth?: string;
  savedCandidates?: string[];
  lastVisited?: Timestamp;
  language?: string;
};

export const saveUserPreferences = async (userId: string, prefs: Partial<UserPreferences>) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    ...prefs,
    lastVisited: Timestamp.now(),
  }, { merge: true });
};

export const getUserPreferences = async (userId: string): Promise<UserPreferences | null> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data() as UserPreferences;
  }
  return null;
};

export const toggleSavedCandidate = async (userId: string, candidateId: string) => {
  const prefs = await getUserPreferences(userId);
  const saved = prefs?.savedCandidates || [];
  
  const newSaved = saved.includes(candidateId)
    ? saved.filter(id => id !== candidateId)
    : [...saved, candidateId];
    
  await saveUserPreferences(userId, { savedCandidates: newSaved });
  return !saved.includes(candidateId);
};
