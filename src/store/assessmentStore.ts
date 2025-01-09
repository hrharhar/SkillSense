import { create } from 'zustand';
import { Assessment, Result, User } from '../types';
import { assessments } from '../data/assessments';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface AssessmentStore {
  currentUser: User | null;
  assessments: Assessment[];
  results: Result[];
  setCurrentUser: (user: User | null) => void;
  addAssessment: (assessment: Assessment) => Promise<void>;
  addResult: (result: Result) => Promise<void>;
  fetchResults: () => Promise<void>;
}

export const useAssessmentStore = create<AssessmentStore>((set) => ({
  currentUser: null,
  assessments: assessments,
  results: [],
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addAssessment: async (assessment) => {
    try {
      await addDoc(collection(db, 'assessments'), assessment);
      set((state) => ({ assessments: [...state.assessments, assessment] }));
    } catch (error) {
      console.error('Error adding assessment:', error);
      throw error;
    }
  },
  
  addResult: async (result) => {
    try {
      await addDoc(collection(db, 'results'), result);
      set((state) => ({ results: [...state.results, result] }));
    } catch (error) {
      console.error('Error adding result:', error);
      throw error;
    }
  },
  
  fetchResults: async () => {
    try {
      const q = query(
        collection(db, 'results'),
        orderBy('completedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as Result);
      set({ results });
    } catch (error) {
      console.error('Error fetching results:', error);
      throw error;
    }
  },
}));